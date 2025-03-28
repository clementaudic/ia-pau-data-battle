'use client';

import { ChatInput } from '@components/chats/ChatInput';
import { MessagesSection } from '@components/chats/MessagesSection';
import { useMutation } from '@hooks/useMutation';
import { useRequest } from '@hooks/useRequest';
import { ChatService } from '@lib/services/chat';
import {
    type Chat,
    type ChatQuestionAskData,
    type Message,
    MessageSender,
} from '@lib/types';
import { Fragment, type FunctionComponent, useCallback, useState } from 'react';
import { RiLoader2Fill, RiQuestionnaireFill } from 'react-icons/ri';

interface ChatSectionProps {
    chatId: Chat['id'];
}

export const ChatSection: FunctionComponent<ChatSectionProps> = ({ chatId }) => {
    const [userMessage, setUserMessage] = useState<Message | null>(null);
    
    const { data: chat, isLoading, mutate } = useRequest(
        chatId ? ['get-chat', chatId] : null,
        async ([, chatId]) => {
            return ChatService.getChat(chatId);
        },
    );
    
    const { trigger: triggerAsk, isMutating, error: askError } = useMutation(
        chatId ? ['ask-question', chatId] : null,
        async ([, chatId], { arg: payload }: { arg: ChatQuestionAskData }) => {
            return ChatService.askQuestion(chatId, payload);
        },
    );
    
    const { trigger: triggerClear, isMutating: isClearing } = useMutation(
        chatId ? ['clear-chat', chatId] : null,
        async ([, chatId]) => {
            return ChatService.clearChat(chatId);
        },
    );
    
    const { trigger: triggerGenerateQuestions, isMutating: isGeneratingQuestions, error: generateQuestionsError } = useMutation(
        chatId ? ['generate-questions', chatId] : null,
        async ([, chatId]) => {
            return ChatService.generateQuestions(chatId);
        }
    );
    
    const clearChat = useCallback(async () => {
        if (isClearing) return;
        
        try {
            if (!confirm('Are you sure you want to clear the chat?')) {
                return;
            }
            
            await triggerClear();
            await mutate();
        } catch (error) {
            console.error(error);
        }
    }, [isClearing, triggerClear, mutate]);
    
    const generateQuestions = useCallback(async () => {
        if (isGeneratingQuestions) return;
        
        setUserMessage(null);
        
        try {
            await triggerGenerateQuestions();
            await mutate();
        } catch (error) {
            console.error(error);
        }
    }, [isGeneratingQuestions, triggerGenerateQuestions, mutate]);
    
    const sendQuestion = useCallback(async (question: string) => {
        if (isMutating) return;
        
        setUserMessage({
            content: question,
            sender: MessageSender.USER,
        });
        
        try {
            await triggerAsk({ question });
            await mutate();
            
            setUserMessage(null);
        } catch (error) {
            console.error(error);
        }
    }, [isMutating, triggerAsk, mutate]);
    
    if (!isLoading && !chat) {
        return (
            <p>Chat not found</p>
        );
    }
    
    return (
        <Fragment>
            <MessagesSection
                messages={
                    chat ? (
                        userMessage
                            ? [...chat.messages, userMessage]
                            : chat.messages
                    ) : []
                }
                isLoading={isMutating || isGeneratingQuestions}
                error={askError || generateQuestionsError}
            />
            <button
                type="button"
                disabled={isMutating || isLoading || isClearing || isGeneratingQuestions}
                onClick={generateQuestions}
                className="absolute bottom-52 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2.5 px-5 py-2.5 shadow-md hover:shadow-lg rounded-xl text-white font-medium bg-tertiary cursor-pointer transition-all"
            >
                {
                    isGeneratingQuestions ? (
                        <RiLoader2Fill className="size-5 animate-spin"/>
                    ) : (
                        <RiQuestionnaireFill className="size-5"/>
                    )
                }
                <p>Generate me a few questions</p>
            </button>
            <ChatInput
                showClearButton={chat && chat.messages.length > 0}
                onClear={clearChat}
                isSendDisabled={isMutating || isLoading || isClearing || isGeneratingQuestions}
                onTextSend={sendQuestion}
            />
        </Fragment>
    );
}
