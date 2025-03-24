'use client';

import { cn } from '@utils/style';
import { type FunctionComponent, type HTMLAttributes, type InputHTMLAttributes, useCallback, useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    wrapperClassName?: HTMLAttributes<HTMLDivElement>['className'];
}

export const Input: FunctionComponent<InputProps> = ({ label, wrapperClassName, id, type, ...props }) => {
    return (
        <div className={cn('w-full', wrapperClassName)}>
            {
                label && (
                    <label htmlFor={id} className="block mb-1">
                        {label}
                    </label>
                )
            }
            {
                type === 'password' ? (
                    <PasswordInput
                        id={id}
                        type={type}
                        {...props}
                    />
                ) : (
                    <SimpleInput
                        id={id}
                        type={type}
                        {...props}
                    />
                )
            }
        </div>
    );
}

const PasswordInput: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({ type, ...props }) => {
    const [inputType, setInputType] = useState(type);
    
    const toggleInputType = useCallback<NonNullable<HTMLAttributes<HTMLButtonElement>['onClick']>>(() => {
        console.log('change')
        setInputType((prev) => prev === 'password' ? 'text' : 'password');
    }, []);
    
    const Icon = inputType === 'password' ? RiEyeFill : RiEyeOffFill;
    
    return (
        <div className="relative w-full">
            <SimpleInput
                type={inputType}
                {...props}
            />
            <button
                type="button"
                onClick={toggleInputType}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
                <Icon className="size-5 text-neutral" />
            </button>
        </div>
    )
}

const SimpleInput: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    return (
        <input
            {...props}
            className={cn('w-full h-10 px-2.5 rounded-md border border-gray-200 focus:outline-2 focus:outline-secondary hover:outline-1 hover:outline-primary', className)}
        />
    )
}
