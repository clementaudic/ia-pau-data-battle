import { LogoutButton } from '@components/auth/LogoutButton';
import { MainLayout } from '@components/ui/MainLayout';
import { AuthService } from '@lib/services/auth';
import type { PropsWithChildren } from 'react';

export default async function AppLayout({ children }: PropsWithChildren) {
    const userProfile = (await AuthService.getUserProfile())!;
    
    return (
        <MainLayout
            headerSuffix={(
                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2.5">
                        <p className="font-medium">Hello, {userProfile.firstName}</p>
                        <div className="flex justify-center items-center size-10 rounded-full bg-primary">
                            <p className="text-lg text-white font-semibold uppercase">
                                {userProfile.firstName[0]}{userProfile.lastName[0]}
                            </p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            )}
        >
            {children}
        </MainLayout>
    );
}
