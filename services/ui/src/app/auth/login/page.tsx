import { LoginForm } from '@components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center gap-5 size-full">
            <LoginForm />
            <p>
                No account yet?
                {' '}
                <Link href="/auth/register">
                    <span className="font-medium underline underline-offset-2">
                        Register now
                    </span>
                </Link>
                !
            </p>
        </div>
    );
}
