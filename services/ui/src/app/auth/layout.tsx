import { AuthTitle } from '@components/auth/AuthTitle';
import { Logo } from '@components/ui/Logo';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex justify-center items-center size-full">
            <div className="flex flex-col gap-10 w-sm lg:w-1/2 2xl:w-1/3 h-2/3 min-h-max p-2.5 md:p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center gap-2.5">
                    <Logo/>
                    <Link
                        href="/app"
                        className="block px-4 py-1 rounded-md outline outline-secondary text-secondary transition-all hover:bg-secondary hover:text-white"
                    >
                        <p>Go back</p>
                    </Link>
                </div>
                <AuthTitle />
                <div className="w-full flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
