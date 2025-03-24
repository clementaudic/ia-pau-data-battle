'use client';

import { Input, type InputProps } from '@components/form/Input';
import { Button } from '@components/ui/Button';
import { useMutation } from '@hooks/useMutation';
import { useValidate } from '@hooks/useValidate';
import { AuthService } from '@lib/services/auth';
import { registerSchema, type RegisterData } from '@lib/types';
import { toast } from '@utils/toast';
import { useRouter } from 'next/navigation';
import { type FormEventHandler, type FunctionComponent, useCallback, useState } from 'react';

type Data = RegisterData & { confirmPassword: RegisterData['password'] };

export const RegisterForm: FunctionComponent = () => {
    const router = useRouter();
    const { validate } = useValidate(registerSchema);
    const [data, setData] = useState<Data>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
    });
    
    const changeData = useCallback<(key: keyof Data) => InputProps['onChange']>((key) => (event) => {
        setData((previousData) => ({
            ...previousData,
            [key]: event.target.value
        }));
    }, [])
    
    const { trigger, isMutating } = useMutation(
        'register',
        async (_, { arg: payload }: { arg: RegisterData }) => {
            return AuthService.register(payload);
        }
    );
    
    const register = useCallback<FormEventHandler<HTMLFormElement>>(async (event) => {
        event.preventDefault();
        
        if (isMutating) return;
        
        const { confirmPassword, ...actualData } = data;
        
        if (confirmPassword !== actualData.password) {
            toast.error('Passwords does not match');
            return;
        }
        
        const validatedData = validate(actualData);
        
        if (!validatedData) return;
        
        try {
            await trigger(data);
            
            toast.success('Your account have been created');
            
            router.replace('/app');
        } catch (error) {
            console.error(error);
        }
    }, [router, isMutating, data, validate, trigger]);
    
    return (
        <form
            onSubmit={register}
            className="flex flex-col justify-center gap-y-10 w-full flex-1 px-5"
        >
            <div className="flex flex-col justify-center gap-y-5 w-full">
                <Input
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={data.lastName}
                    onChange={changeData('lastName')}
                />
                <Input
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={data.firstName}
                    onChange={changeData('firstName')}
                />
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
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="confirmPassword"
                    label="Confirm Password"
                    value={data.confirmPassword}
                    onChange={changeData('confirmPassword')}
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
