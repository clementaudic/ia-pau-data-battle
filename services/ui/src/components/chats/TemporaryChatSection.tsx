'use client';

import { ChatInput } from '@components/chats/ChatInput';
import { MessagesSection } from '@components/chats/MessagesSection';
import { useMutation } from '@hooks/useMutation';
import { useSearchParamsChange } from '@hooks/useSearchParamsChange';
import { DEFAULT_SUBJECT, SUBJECT_PARAM_KEY } from '@lib/constants';
import { ChatService } from '@lib/services/chat';
import { type ChatQuestionAskTemporaryData, type Message, MessageSender, Subject } from '@lib/types';
import { Fragment, type FunctionComponent, useCallback, useEffect, useState } from 'react';

export const TemporaryChatSection: FunctionComponent = () => {
    const { searchParams } = useSearchParamsChange();
    const [messages, setMessages] = useState<Array<Message>>([]);
    
    const { trigger, isMutating, error } = useMutation(
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
    
    const confirmRefresh = useCallback(
        (event: BeforeUnloadEvent) => {
            if (messages.length > 0) {
                event.preventDefault();
                event.returnValue = '';
                return 'Your messages will be lost if you leave this page.';
            }
            
            return;
        },
        [messages],
    );
    
    useEffect(() => {
        window.onbeforeunload = confirmRefresh;
        
        return () => {
            window.onbeforeunload = null;
        };
    }, [confirmRefresh]);
    
    return (
        <Fragment>
            <MessagesSection
                messages={messages}
                isLoading={isMutating}
                error={error}
            />
            <ChatInput
                showSubjectSelector
                isSendDisabled={isMutating}
                onTextSend={sendQuestion}
            />
        </Fragment>
    );
}
