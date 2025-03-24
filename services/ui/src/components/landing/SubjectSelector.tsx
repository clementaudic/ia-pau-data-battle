'use client';

import { useSearchParamsChange } from '@hooks/useSearchParamsChange';
import { DEFAULT_SUBJECT, SUBJECT_PARAM_KEY } from '@lib/constants';
import { Subject } from '@lib/types';
import { type FunctionComponent, useCallback } from 'react';
import Switch, { type ReactSwitchProps } from 'react-switch';

export const SubjectSelector: FunctionComponent = () => {
    const { searchParams, changeSearchParam } = useSearchParamsChange<typeof SUBJECT_PARAM_KEY>();
    
    const subject = searchParams.get(SUBJECT_PARAM_KEY) as Subject ?? DEFAULT_SUBJECT;
    
    const changeSubject = useCallback<ReactSwitchProps['onChange']>((checked) => {
        changeSearchParam(SUBJECT_PARAM_KEY)(checked ? Subject.EQE : Subject.EPAC);
    }, [changeSearchParam]);
    
    return (
        <div className="flex items-center gap-5">
            <SubjectText
                subject={Subject.EPAC}
                isSelected={subject === Subject.EPAC}
            />
            <Switch
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#086192"
                offColor="#086192"
                checked={subject === Subject.EQE}
                onChange={changeSubject}
            />
            <SubjectText
                subject={Subject.EQE}
                isSelected={subject === Subject.EQE}
            />
        </div>
    );
}

interface SubjectTextProps {
    subject: Subject;
    isSelected: boolean;
}

const SubjectText: FunctionComponent<SubjectTextProps> = ({ subject, isSelected }) => {
    return (
        <p className={`text-3xl font-semibold transition-all ${isSelected ? 'text-primary' : 'text-gray-400'}`}>
            {subject}
        </p>
    );
}
