'use client';

import { ChatInput } from '@components/chats/ChatInput';
import { useMutation } from '@hooks/useMutation';
import { useSearchParamsChange } from '@hooks/useSearchParamsChange';
import { DEFAULT_SUBJECT, SUBJECT_PARAM_KEY } from '@lib/constants';
import { ChatService } from '@lib/services/chat';
import { type ChatQuestionAskTemporaryData, type Message, MessageSender, Subject } from '@lib/types';
import { cn } from '@utils/style';
import { Fragment, type FunctionComponent, useCallback, useState } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';

export const ChatSection: FunctionComponent = () => {
    const { searchParams } = useSearchParamsChange();
    const [messages, setMessages] = useState<Array<Message>>([]);
    
    const { trigger, isMutating } = useMutation(
        'ask-temporary-question',
        async (_, { arg: payload }: { arg: ChatQuestionAskTemporaryData }) => {
            return ChatService.askQuestionTemporary(payload);
        },
    );
    
    const addMessage = useCallback((message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }, []);
    
    const sendQuestion = useCallback(async (question: string) => {
        addMessage({
            content: question,
            sender: MessageSender.USER,
        });
        
        try {
            const aiResponse = await trigger({
                subject: searchParams.get(SUBJECT_PARAM_KEY) as Subject ?? DEFAULT_SUBJECT,
                question,
                chatHistory: messages
            });
            
            if (aiResponse) {
                addMessage({
                    content: aiResponse.content,
                    sender: MessageSender.AI,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }, [searchParams, addMessage, isMutating, trigger, messages]);
    
    return (
        <Fragment>
            <section className="lg:w-2/3 xl:w-1/2 min-h-max space-y-5">
                {
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                'w-fit min-w-1/2 max-w-3/4 p-5 rounded-2xl',
                                message.sender === MessageSender.USER ? 'ml-auto rounded-tr-none text-black bg-primary/10' : 'mr-auto rounded-tl-none text-white bg-primary/90',
                            )}
                        >
                            <p className="selection:bg-tertiary/50">
                                {message.content}
                            </p>
                        </div>
                    ))
                }
                {
                    isMutating && (
                        <div className="flex items-center gap-2.5">
                            <RiLoader2Fill className="size-6 text-tertiary-dark animate-spin" />
                            <p>
                                I&apos;m thinking, please wait...
                            </p>
                        </div>
                    )
                }
            </section>
            <ChatInput
                showSubjectSelector
                onTextSend={sendQuestion}
            />
        </Fragment>
    );
}
