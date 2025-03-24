import { toast } from '@utils/toast';
import { useCallback } from 'react';
import type { ZodObject, ZodRawShape } from 'zod';

export const useValidate = <T, O extends ZodRawShape>(schema: ZodObject<O>) => {
    const validate = useCallback(
        (data: T) => {
            const result = schema.safeParse(data);
            
            if (!result.success) {
                const validationErrors = result.error.errors.map((error) => error.message);
                
                for (const error of validationErrors) {
                    toast.error(error);
                }
                
                return null;
            }
            
            return result.data;
        },
        [schema],
    );
    
    return { validate };
};
