'use client';

import { CreationButton } from '@components/landing/CreationButton';
import { useMutation } from '@hooks/useMutation';
import { ChatService } from '@lib/services/chat';
import type { Subject } from '@lib/types';
import { useRouter } from 'next/navigation';
import { type FunctionComponent, useCallback } from 'react';
import { RiQuestionAnswerFill } from 'react-icons/ri';

interface ChatGeneratorProps {
    subject: Subject;
}

export const ChatCreationButton: FunctionComponent<ChatGeneratorProps> = ({ subject }) => {
    const router = useRouter();
    
    const { trigger, isMutating } = useMutation(
        ['create-new-chat', subject],
        async ([, subject]) => {
            return ChatService.createChat({ subject });
        }
    );
    
    const createChat = useCallback(async () => {
        if (isMutating) return;
        
        const createdChat = await trigger();
        
        if (createdChat) {
            router.push(`/app/chats/${createdChat.id}`);
        }
    }, [router, isMutating, trigger]);
    
    return (
        <CreationButton
            icon={RiQuestionAnswerFill}
            text="New chat"
            isLoading={isMutating}
            onClick={createChat}
        />
    )
}
