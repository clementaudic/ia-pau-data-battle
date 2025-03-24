import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Value = string | Array<string>;

export interface UseSearchParamsChange<T extends string> {
    searchParams: ReadonlyURLSearchParams;
    changeSearchParam: (key: T) => (value: Value) => void;
    changeSearchParamMulti: (keys: Array<T>) => (values: Array<Value>) => void;
}

const isDefined = (value: string | undefined): value is string => ![undefined, null, ''].includes(value);

export const useSearchParamsChange = <T extends string>(
    { replace }: { replace: boolean } = { replace: true },
): UseSearchParamsChange<T> => {
    const searchParams = useSearchParams();
    
    const changeSearchParamMulti = useCallback(
        (keys: Array<T>) => (values: Array<Value>) => {
            const params = new URLSearchParams(searchParams.toString());
            
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = values[i];
                
                if (key === undefined) {
                    continue;
                }
                
                if (Array.isArray(value)) {
                    params.delete(key);
                    
                    value.forEach((subValue) => {
                        if (isDefined(subValue)) {
                            params.append(key, subValue);
                        }
                    });
                } else {
                    if (isDefined(value)) {
                        params.set(key, value);
                    } else {
                        params.delete(key);
                    }
                }
            }
            
            const newParams = params.size > 0 ? `?${params.toString()}` : window.location.pathname;
            
            if (replace) {
                window.history.replaceState(null, '', newParams);
            } else {
                window.history.pushState(null, '', newParams);
            }
        },
        [replace, searchParams],
    );
    
    const changeSearchParam = useCallback(
        (key: T) => (value: Value) => {
            changeSearchParamMulti([key])([value]);
        },
        [changeSearchParamMulti],
    );
    
    return { searchParams, changeSearchParam, changeSearchParamMulti };
};
