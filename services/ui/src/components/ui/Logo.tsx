import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

export const Logo: FunctionComponent = () => {
    return (
        <Link href="/chats">
            <Image
                src="/logo.png"
                alt="Patent Maestro's Logo"
                width={158}
                height={50}
                priority
                quality={100}
            />
        </Link>
    );
}
