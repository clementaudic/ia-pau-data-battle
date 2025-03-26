'use client';

import { useMutation } from '@hooks/useMutation';
import { DEFAULT_SUBJECT, SUBJECT_PARAM_KEY } from '@lib/constants';
import { ChatService } from '@lib/services/chat';
import type { Subject } from '@lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FunctionComponent, useCallback } from 'react';
import { RiLoaderFill, RiQuestionAnswerFill } from 'react-icons/ri';
import { mutate } from 'swr';

export const ChatCreationButton: FunctionComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const subject = searchParams.get(SUBJECT_PARAM_KEY) as Subject ?? DEFAULT_SUBJECT;
    
    const { trigger, isMutating } = useMutation(
        'create-new-chat',
        async (_, { arg: subject }: { arg: Subject }) => {
            return ChatService.createChat({ subject });
        }
    );
    
    const createChat = useCallback(async () => {
        if (isMutating) return;
        
        const createdChat = await trigger(subject);
        
        if (createdChat) {
            await mutate('all-chats');
            
            router.push(`/chats/${createdChat.id}`);
        }
    }, [subject, router, isMutating, trigger]);
    
    return (
        <button
            onClick={createChat}
            className="flex flex-col justify-center items-center gap-5 size-60 p-5 text-primary not-hover:outline not-hover:outline-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300"
        >
            <RiQuestionAnswerFill className="size-20"/>
            <p className="relative text-2xl font-semibold">
                {isMutating && (
                    <RiLoaderFill className="absolute right-full top-1/2 -translate-y-1/2 mr-2.5 size-6 animate-spin"/>
                )}
                New Chat
            </p>
        </button>
    )
}
