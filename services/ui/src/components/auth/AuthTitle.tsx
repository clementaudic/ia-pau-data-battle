'use client';

import { usePathname } from 'next/navigation';
import type { FunctionComponent } from 'react';

const titleMap: Record<string, string> = {
    '/auth/login': 'Login',
    '/auth/register': 'Create an account'
};

export const AuthTitle: FunctionComponent = () => {
    const pathname = usePathname();
    
    return (
        <h1 className="text-4xl text-center text-primary font-semibold break-after-right">
            {titleMap[pathname]}
        </h1>
    );
};
