import { cn } from '@utils/style';
import type { ButtonHTMLAttributes, FunctionComponent } from 'react';
import type { IconType } from 'react-icons';
import { RiLoader2Fill } from 'react-icons/ri';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    isLoading?: boolean;
    children?: string;
    icon?: IconType
}

export const Button: FunctionComponent<ButtonProps> = ({ icon: Icon, isLoading, disabled, className, children, ...props }) => {
    return (
        <button
            disabled={isLoading || disabled}
            {...props}
            className={cn(
                'flex justify-center items-center gap-2.5 h-10 px-5 rounded-md text-white bg-secondary hover:bg-primary transition-all',
                disabled && 'cursor-not-allowed bg-secondary/75',
                className
            )}
        >
            {
                isLoading ? (
                    <RiLoader2Fill className="size-5 animate-spin" />
                ) : Icon && (
                    <Icon className="size-5" />
                )
            }
            <p>
                {children}
            </p>
        </button>
    );
}
