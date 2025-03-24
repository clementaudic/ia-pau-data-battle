import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { RiSparkling2Fill } from 'react-icons/ri';

export default function MainLayout({ children }: PropsWithChildren) {
    // TODO: Add profile fetching
    
    return (
        <div className="relative flex flex-col size-full">
            <header className="sticky top-0 left-0 flex justify-between items-start gap-2.5 p-5 bg-gradient-to-b from-white from-50% to-transparent">
                <Link href="/app">
                    <Image
                        src="/logo.png"
                        alt="Patent Maestro's Logo"
                        width={158}
                        height={50}
                    />
                </Link>
                <div className="flex items-center gap-2.5">
                    <p className="font-medium">Hello, Clément</p>
                    <div className="flex justify-center items-center size-10 rounded-full bg-primary">
                        <p className="text-lg text-white font-semibold">
                            CA
                        </p>
                    </div>
                </div>
            </header>
            <main className="w-full flex-1">
                {children}
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2.5 text-neutral">
                    <p>Powered by AI</p>
                    <RiSparkling2Fill className="size-7"/>
                </div>
            </main>
        </div>
    );
}
