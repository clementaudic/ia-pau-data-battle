import { DEFAULT_ERROR_MESSAGE } from '@lib/constants';
import { toast } from '@utils/toast';
import { useEffect } from 'react';
import useSWR, { type Key, type Fetcher } from 'swr';

export const useRequest = <K extends Key, D>(key: K, fetcher: Fetcher<D, K>) => {
    const { error, ...rest } = useSWR(key, fetcher);
    
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
