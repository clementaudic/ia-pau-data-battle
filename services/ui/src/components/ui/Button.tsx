import { cn } from '@utils/style';
import type { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { RiLoader2Fill } from 'react-icons/ri';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    isLoading?: boolean;
    children?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({ isLoading, className, children, ...props }) => {
    return (
        <button
            {...props}
            className={cn('flex justify-center items-center gap-2.5 h-10 rounded-md text-white bg-secondary hover:bg-primary transition-all', className)}
        >
            {
                isLoading && (
                    <RiLoader2Fill className="size-5 animate-spin" />
                )
            }
            <p>
                {children}
            </p>
        </button>
    );
}
