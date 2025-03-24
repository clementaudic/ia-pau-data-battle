import { cn } from '@/lib/utils/style';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import type { PropsWithChildren } from 'react';

const appFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Patent Maestro',
    description: 'Patent Maestro is a platform that helps you prepare for your EQE and EPC patent exams under the European Patent Office.',
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={cn('w-screen h-screen bg-gray-100', appFont.className)}>
                {children}
            </body>
        </html>
    );
}
