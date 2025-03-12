import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import type { PropsWithChildren } from 'react';

const appFont = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'App',
};

export default function RootLayout({ children  }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${appFont.className}`}>
        {children}
      </body>
    </html>
  );
}
