import type { Chat } from '@lib/types';
import Link from 'next/link';
import { type FunctionComponent, type MouseEventHandler, useCallback } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';

interface ChatCardProps {
    chat: Chat;
    isDeleting: boolean;
    onDelete: VoidFunction;
}

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});

export const ChatCard: FunctionComponent<ChatCardProps> = ({ chat, isDeleting, onDelete }) => {
    const handleChatDelete = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
        event.preventDefault();
        event.stopPropagation();
        onDelete();
    }, [onDelete]);
    
    return (
        <Link href={`/chats/${chat.id}`}>
            <div className="group flex items-center gap-2.5 p-2.5 bg-primary/10 rounded-lg cursor-pointer">
                <div>
                    <p className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {chat.title}
                    </p>
                    <p className="flex items-center gap-0.5 text-neutral/75 font-medium">
                        <span>{chat.subject}</span> - <span className="text-sm">{dateFormatter.format(new Date(chat.createdAt))}</span>
                    </p>
                </div>
                <button
                    onClick={handleChatDelete}
                    disabled={isDeleting}
                    className="hidden group-hover:inline-block ml-auto text-white bg-red-500 rounded-full p-2 cursor-pointer hover:bg-red-600 transition-all"
                >
                    <RiDeleteBin5Fill className="size-4"/>
                </button>
            </div>
        </Link>
    );
}
