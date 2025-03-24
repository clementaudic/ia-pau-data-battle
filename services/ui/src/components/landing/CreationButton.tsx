import type { FunctionComponent } from 'react';
import type { IconType } from 'react-icons';
import { RiLoaderFill } from 'react-icons/ri';

interface CreationButtonProps {
    icon: IconType;
    text: string;
    isLoading?: boolean;
    onClick?: VoidFunction;
}

export const CreationButton: FunctionComponent<CreationButtonProps> = ({ icon: Icon, text, isLoading, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex flex-col justify-center items-center gap-5 size-60 p-5 text-primary not-hover:outline not-hover:outline-gray-100 rounded-2xl shadow-lg hover:shadow-xl hover:bg-primary hover:text-white transition-all duration-300"
        >
            <Icon className="size-20"/>
            <p className="relative text-2xl font-semibold">
                {isLoading && (
                    <RiLoaderFill className="absolute right-full top-1/2 -translate-y-1/2 mr-2.5 size-6 animate-spin"/>
                )}
                {text}
            </p>
        </button>
    );
}
