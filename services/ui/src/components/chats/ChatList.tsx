'use client';

import { ChatCard } from '@components/chats/ChatCard';
import { Loader } from '@components/ui/Loader';
import { useMutation } from '@hooks/useMutation';
import { useRequest } from '@hooks/useRequest';
import { ChatService } from '@lib/services/chat';
import type { Chat } from '@lib/types';
import { toast } from '@utils/toast';
import { useParams, useRouter } from 'next/navigation';
import { type FunctionComponent, useCallback } from 'react';

export const ChatList: FunctionComponent = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    
    const { data: chats, isLoading, mutate } = useRequest(
        'all-chats',
        ChatService.getChats
    );
    
    const { trigger, isMutating } = useMutation(
        'delete-chat',
        async (_, { arg: chatId }: { arg: Chat['id'] }) => {
            return ChatService.deleteChat(chatId);
        }
    );
    
    const deleteChat = useCallback((chatId: Chat['id']) => async () => {
        if (isMutating) return;
        
        try {
            await trigger(chatId);
            
            toast.success('Chat deleted successfully');
            
            if (params.id === chatId) {
                router.replace('/chats');
            }
            
            await mutate();
        } catch (error) {
            console.error(error);
        }
    }, [router, params, mutate, trigger, isMutating]);
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center size-full">
                <Loader/>
            </div>
        )
    }
    
    if (!chats) {
        return (
            <div className="flex items-center justify-center size-full">
                <p className="text-red-500">Something went wrong</p>
            </div>
        );
    }
    
    if (chats.length == 0) {
        return (
            <div className="flex items-center justify-center size-full">
                <p className="text-gray-500">No chats found</p>
            </div>
        );
    }
    
    return (
        <ul className="w-full flex-1 p-2.5 space-y-2.5 overflow-y-auto">
            {
                chats.map((chat) => (
                    <li key={chat.id}>
                        <ChatCard
                            chat={chat}
                            isDeleting={isMutating}
                            onDelete={deleteChat(chat.id)}
                        />
                    </li>
                ))
            }
        </ul>
    );
}
