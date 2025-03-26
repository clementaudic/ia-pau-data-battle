'use client';

import { useSearchParamsChange } from '@hooks/useSearchParamsChange';
import { DEFAULT_SUBJECT, SUBJECT_PARAM_KEY } from '@lib/constants';
import { Subject } from '@lib/types';
import { type FunctionComponent, useCallback } from 'react';

interface InlineSubjectSelectorProps {
    onSubjectChange?: VoidFunction;
}

export const InlineSubjectSelector: FunctionComponent<InlineSubjectSelectorProps> = ({ onSubjectChange }) => {
    const { searchParams, changeSearchParam } = useSearchParamsChange<typeof SUBJECT_PARAM_KEY>();
    
    const subject = searchParams.get(SUBJECT_PARAM_KEY) as Subject ?? DEFAULT_SUBJECT;
    
    const changeSubject = useCallback((subject: Subject) => () => {
        changeSearchParam(SUBJECT_PARAM_KEY)(subject);
        onSubjectChange?.();
    }, [onSubjectChange, changeSearchParam]);
    
    return (
        <div className="space-y-1">
            <p className="text-sm text-end text-gray-500">
                Subject
            </p>
            <div className="flex flex-col min-w-28 rounded-lg bg-neutral/10">
                <SubjectButton
                    subject={Subject.EPAC}
                    isSelected={subject === Subject.EPAC}
                    onClick={changeSubject(Subject.EPAC)}
                />
                <SubjectButton
                    subject={Subject.EQE}
                    isSelected={subject === Subject.EQE}
                    onClick={changeSubject(Subject.EQE)}
                />
            </div>
        </div>
    );
}

interface SubjectButtonProps {
    subject: Subject;
    isSelected: boolean;
    onClick: VoidFunction;
}

const SubjectButton: FunctionComponent<SubjectButtonProps> = ({ subject, isSelected, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full px-2 py-1 text-lg font-semibold rounded-lg transition-all ${isSelected ? 'text-secondary bg-primary/20' : 'text-gray-500'}`}
        >
            {subject}
        </button>
    );
}
