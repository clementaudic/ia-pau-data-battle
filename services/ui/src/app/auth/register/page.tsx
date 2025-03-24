import { RegisterForm } from '@components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center gap-10 size-full">
            <RegisterForm />
            <p>
                Already have an account?
                {' '}
                <Link href="/auth/login">
                    <span className="font-medium underline underline-offset-2">
                        Login now
                    </span>
                </Link>
                !
            </p>
        </div>
    );
}
