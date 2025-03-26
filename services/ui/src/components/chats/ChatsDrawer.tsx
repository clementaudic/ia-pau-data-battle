'use client';

import { ChatList } from '@components/chats/ChatList';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Fragment, type FunctionComponent, useCallback, useState } from 'react';
import { RiArrowRightWideFill, RiHome2Fill } from 'react-icons/ri';
import 'react-modern-drawer/dist/index.css'

const Drawer = dynamic(() => import('react-modern-drawer'), { ssr: false });

export const ChatsDrawer: FunctionComponent = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDrawer = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);
    
    const goToHome = useCallback(() => {
        setIsOpen(false);
        router.push('/chats');
    }, [router]);
    
    return (
        <Fragment>
            <button
                onClick={toggleDrawer}
                className="absolute left-0 top-20 h-[calc(100%-5rem)] px-2.5 cursor-pointer text-neutral/50 hover:text-primary hover:bg-gradient-to-r hover:from-neutral/10 hover:from-50% hover:to-transparent transition-all"
            >
                <RiArrowRightWideFill className="size-16" />
            </button>
            <Drawer
                direction="left"
                size="30vw"
                open={isOpen}
                onClose={toggleDrawer}
            >
                <aside className="flex flex-col gap-y-10 size-full p-5 pr-2.5 pb-10">
                    <div className="flex items-center justify-between gap-2.5 px-2.5">
                        <h2 className="text-3xl font-semibold">
                            My chats
                        </h2>
                        <button
                            type="button"
                            onClick={goToHome}
                            className="p-2 rounded-full cursor-pointer hover:bg-neutral/10 hover:text-tertiary transition-colors"
                        >
                            <RiHome2Fill className="size-8"/>
                        </button>
                    </div>
                    <ChatList/>
                </aside>
            </Drawer>
        </Fragment>
    );
}
