'use client';

import { CreationButton } from '@components/landing/CreationButton';
import { useMutation } from '@hooks/useMutation';
import { ChatService } from '@lib/services/chat';
import type { Subject } from '@lib/types';
import { useRouter } from 'next/navigation';
import { type FunctionComponent, useCallback } from 'react';
import { RiQuestionnaireFill } from 'react-icons/ri';

interface QuizCreationButtonProps {
    subject: Subject;
}

export const QuizCreationButton: FunctionComponent<QuizCreationButtonProps> = ({ subject }) => {
    const router = useRouter();
    
    const { trigger, isMutating } = useMutation(
        ['create-new-quiz', subject],
        async ([, subject]) => {
            return ChatService.createChat({ subject });
        }
    );
    
    const createQuiz = useCallback(async () => {
        if (isMutating) return;
        
        const createdQuiz = await trigger();
        
        if (createdQuiz) {
            router.push(`/app/quizzes/${createdQuiz.id}`);
        }
    }, [router, isMutating, trigger]);
    
    return (
        <CreationButton
            icon={RiQuestionnaireFill}
            text="New quiz"
            isLoading={isMutating}
            onClick={createQuiz}
        />
    )
}
