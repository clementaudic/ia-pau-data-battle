import { SubjectSelector } from '@components/landing/SubjectSelector';
import { MainLayout } from '@components/ui/MainLayout';
import Link from 'next/link';
import { Fragment } from 'react';
import { RiUser3Fill } from 'react-icons/ri';

export default function GuestPage() {
    return (
        <MainLayout
            headerSuffix={(
                <Fragment>
                    <div className="flex items-center gap-5">
                        <Link href="/auth/login">
                            <p className="text-lg underline underline-offset-2 transition-all hover:font-medium hover:tracking-widest">
                                Login
                            </p>
                        </Link>
                        <div className="flex justify-center items-center size-10 rounded-full text-white bg-primary">
                            <RiUser3Fill className="size-6"/>
                        </div>
                    </div>
                    <div className="z-50 absolute top-0 left-1/2 -translate-x-1/2 flex justify-center w-fit px-10 py-2.5 rounded-b-xl text-white font-medium bg-tertiary">
                        <p className="text-center">
                            <Link href="/auth/register" className="underline underline-offset-2">
                                Sign up
                            </Link>
                            {' '}to have full access to Patent Maestro full features !
                        </p>
                    </div>
                </Fragment>
            )}
        >
            <div className="flex flex-col items-center gap-2.5 pt-20">
                <p className="text-2xl font-semibold text-center">
                    Choose a subject
                </p>
                <SubjectSelector/>
            </div>
        </MainLayout>
    );
}
