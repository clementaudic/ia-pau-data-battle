import { Logo } from '@components/ui/Logo';
import dynamic from 'next/dynamic';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { RiSparkling2Fill } from 'react-icons/ri';

const ChatsDrawer = dynamic(() => import('@components/chats/ChatsDrawer').then((mod) => mod.ChatsDrawer));

interface MainLayoutProps extends PropsWithChildren {
    headerSuffix?: ReactNode;
    showChatsDrawer?: boolean;
}

export const MainLayout: FunctionComponent<MainLayoutProps> = ({ headerSuffix, showChatsDrawer, children }) => {
    return (
        <div className="relative flex flex-col size-full">
            <header className="absolute top-0 left-0 flex justify-between items-start gap-2.5 w-full p-5 bg-gradient-to-b from-white from-50% to-transparent">
                <Logo/>
                {headerSuffix}
            </header>
            {
                showChatsDrawer && (
                    <ChatsDrawer/>
                )
            }
            <main className="flex flex-col items-center gap-5 w-full h-screen pt-20 pb-72 overflow-y-auto">
                {children}
                <div className="absolute bottom-2.5 right-5 flex items-center gap-2.5 text-neutral">
                    <p>Powered by AI</p>
                    <RiSparkling2Fill className="size-7"/>
                </div>
            </main>
        </div>
    );
}
