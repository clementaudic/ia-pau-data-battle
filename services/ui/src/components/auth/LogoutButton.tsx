'use client';

import { useMutation } from '@hooks/useMutation';
import { AuthService } from '@lib/services/auth';
import { toast } from '@utils/toast';
import { useRouter } from 'next/navigation';
import { type FunctionComponent, useCallback } from 'react';
import { RiLoader2Fill, RiLogoutBoxRLine } from 'react-icons/ri';

export const LogoutButton: FunctionComponent = () => {
    const router = useRouter();
    
    const { trigger, isMutating } = useMutation('logout', AuthService.logout);
    
    const logout = useCallback(async () => {
        if (isMutating) return;
        
        try {
            await trigger();
            
            toast.success('Logged out');
            
            router.push('/auth/login');
        } catch (error) {
            console.error(error);
        }
    }, [router, trigger, isMutating]);
    
    return (
        <button
            type="button"
            title="Logout"
            onClick={logout}
            className="p-2 rounded-full transition-all text-red-500 bg-gray-200 cursor-pointer hover:text-white hover:bg-red-500 hover:border-none"
        >
            {
                isMutating ? (
                    <RiLoader2Fill className="size-4 animate-spin" />
                ) : (
                    <RiLogoutBoxRLine className="size-4"/>
                )
            }
        </button>
    );
}
