'use client';

import { type Message, MessageSender } from '@lib/types';
import { cn } from '@utils/style';
import { type FunctionComponent, useEffect, useRef } from 'react';
import { RiErrorWarningFill, RiLoader2Fill } from 'react-icons/ri';

interface MessagesSectionProps {
    messages: Array<Message>;
    isLoading?: boolean;
    error?: Error;
}

export const MessagesSection: FunctionComponent<MessagesSectionProps> = ({ messages, isLoading, error }) => {
    const lastMessageRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (lastMessageRef.current !== null) {
            lastMessageRef.current.scrollIntoView({ behavior: 'instant' })
        }
    }, [messages]);
    
    const lastMessageIndex = messages.length - 1;
    
    return (
        <section className="lg:w-2/3 xl:w-1/2 min-h-max space-y-5">
            {
                messages.map((message, index) => (
                    <div
                        key={index}
                        ref={index === lastMessageIndex ? lastMessageRef : null}
                        className={cn(
                            'w-fit min-w-3/5 max-w-5/6 p-5 rounded-2xl',
                            message.sender === MessageSender.USER
                                ? 'ml-auto rounded-tr-none text-black bg-primary/10'
                                : 'mr-auto rounded-tl-none text-white bg-primary/90',
                        )}
                    >
                        <p className="selection:bg-tertiary/50">
                            {message.content}
                        </p>
                    </div>
                ))
            }
            {
                isLoading ? (
                    <div className="flex items-center gap-2.5">
                        <RiLoader2Fill className="size-6 text-tertiary-dark animate-spin"/>
                        <p>
                            I&apos;m thinking, please wait...
                        </p>
                    </div>
                ) : error && (
                    <div className="flex items-center gap-2.5 p-5 rounded-xl text-red-500 bg-red-500/5">
                        <RiErrorWarningFill className="size-5"/>
                        <p>
                            An error occurred, please try again later.
                        </p>
                    </div>
                )
            }
        </section>
    );
}
