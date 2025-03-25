'use client';

import { Input, type InputProps } from '@components/form/Input';
import { Button } from '@components/ui/Button';
import { useMutation } from '@hooks/useMutation';
import { useValidate } from '@hooks/useValidate';
import { AuthService } from '@lib/services/auth';
import { type LoginData, loginSchema } from '@lib/types';
import { toast } from '@utils/toast';
import { useRouter } from 'next/navigation';
import { type FormEventHandler, type FunctionComponent, useCallback, useState } from 'react';

export const LoginForm: FunctionComponent = () => {
    const router = useRouter();
    const { validate } = useValidate(loginSchema);
    const [data, setData] = useState<LoginData>({
        email: '',
        password: ''
    });
    
    const changeData = useCallback<(key: keyof LoginData) => InputProps['onChange']>((key) => (event) => {
        setData((previousData) => ({
            ...previousData,
            [key]: event.target.value
        }));
    }, [])
    
    const { trigger, isMutating } = useMutation(
        'login',
        async (_, { arg: payload }: { arg: LoginData }) => {
            return AuthService.login(payload);
        }
    );
    
    const login = useCallback<FormEventHandler<HTMLFormElement>>(async (event) => {
        event.preventDefault();
        
        if (isMutating) return;
        
        const validatedData = validate(data);
        
        if (!validatedData) return;
        
        try {
            await trigger(data);
            
            toast.success('Login successful');
            
            router.replace('/chats');
        } catch (error) {
            console.error(error);
        }
    }, [router, isMutating, data, validate, trigger]);
    
    return (
        <form
            onSubmit={login}
            className="flex flex-col justify-center gap-y-20 w-full flex-1 px-5"
        >
            <div className="flex flex-col justify-center gap-y-10 w-full">
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={data.email}
                    onChange={changeData('email')}
                />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    onChange={changeData('password')}
                />
            </div>
            <Button
                type="submit"
                isLoading={isMutating}
            >
                Submit
            </Button>
        </form>
    );
}
