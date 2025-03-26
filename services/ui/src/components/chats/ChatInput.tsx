'use client';

import { InlineSubjectSelector } from '@components/chats/InlineSubjectSelector';
import { Button } from '@components/ui/Button';
import { type ChangeEventHandler, type FunctionComponent, useCallback, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

interface ChatInputProps {
    isSendDisabled?: boolean;
    showSubjectSelector?: boolean;
    showClearButton?: boolean;
    onClear?: VoidFunction;
    onTextSend?: (text: string) => (void | Promise<void>);
}

export const ChatInput: FunctionComponent<ChatInputProps> = ({ isSendDisabled, showSubjectSelector, showClearButton, onClear, onTextSend }) => {
    const [text, setText] = useState('');
    
    const handleTextChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((event) => {
        setText(event.target.value);
    }, []);
    
    const handleTextSend = useCallback(() => {
        if (onTextSend && text.trim().length > 0) {
            onTextSend(text.trim());
        }
        setText('');
    }, [onTextSend, text]);
    
    return (
        <div className="z-40 absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-5 lg:w-2/3 xl:w-1/2 h-fit p-5 shadow-md rounded-xl bg-white border border-neutral/20">
                <textarea
                    id="chat-input"
                    name="chat-input"
                    className="flex-1 min-h-32 p-2.5 resize-y rounded-lg placeholder:text-gray-400 border border-neutral/20 focus:outline outline-primary"
                    placeholder="Ask a question..."
                    value={text}
                    onChange={handleTextChange}
                />
            <div className="flex flex-col justify-between gap-5">
                <Button
                    id="chat-send"
                    type="button"
                    name="send"
                    icon={RiSendPlaneFill}
                    disabled={isSendDisabled}
                    onClick={handleTextSend}
                >
                    Send
                </Button>
                {
                    showSubjectSelector && (
                        <InlineSubjectSelector/>
                    )
                }
                {
                    showClearButton && (
                        <button
                            id="chat-clear"
                            type="button"
                            name="clear"
                            onClick={onClear}
                            className="text-sm font-light hover:font-medium underline underline-offset-2 cursor-pointer"
                        >
                            Clear chat
                        </button>
                    )
                }
            </div>
        </div>
    );
}
