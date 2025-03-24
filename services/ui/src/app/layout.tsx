import { cn } from '@/lib/utils/style';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import TopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import './globals.css';

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
                <TopLoader
                    color="#0b60d1"
                    shadow="0 0 10px #000000,0 0 5px #000000"
                    initialPosition={0.1}
                    height={5}
                    speed={300}
                    crawlSpeed={100}
                    showSpinner={false}
                />
                <Toaster
                    richColors
                    expand
                    position="top-center"
                    offset={20}
                    toastOptions={{
                        classNames: {
                            title: 'text-sm',
                        },
                    }}
                />
                {children}
            </body>
        </html>
    );
}
