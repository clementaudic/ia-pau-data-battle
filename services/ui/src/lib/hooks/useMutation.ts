import { DEFAULT_ERROR_MESSAGE } from '@lib/constants';
import { toast } from '@utils/toast';
import { useEffect } from 'react';
import useSWRMutation, { type SWRMutationHook } from 'swr/mutation';

export const useMutation: SWRMutationHook = (...args) => {
    const { error, ...rest } = useSWRMutation(...args);
    
    useEffect(() => {
        if (error) {
            toast.error(error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE);
        }
    }, [error]);
    
    return {
        ...rest,
        error: error instanceof Error ? error : new Error(DEFAULT_ERROR_MESSAGE),
    };
};
