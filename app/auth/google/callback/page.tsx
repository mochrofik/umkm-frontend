'use client';


import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import CreatePasswordForm from '@/components/create-password/CreatePasswordForm';
import { GoogleUser } from '@/types/google_user';

export default function GoogleCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [createPassword, setCreatePassword] = useState<boolean>(false);
    const [googleUser, setGoogleUser] = useState<GoogleUser>();
    const [role, setRole] = useState<string>('');
    
    useEffect(() => {
        const code = searchParams.get('code');
        const role = localStorage.getItem('pending_role');
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/google/callback`

        if (code) {
            // Kirim code yang didapat dari Google ke Laravel API
            axios.post(url, { code, role })
                .then(res => {


                    localStorage.removeItem('pending_role');

                    setCreatePassword(res.data.data.create_password);
                    setGoogleUser(res.data.data.google_user);
                    setRole(res.data.data.role);
                })
                .catch(err => {
                    console.error('Login gagal', err);
                });
        }
    }, []);


    if(createPassword){
        return(
            <>
            <CreatePasswordForm
            google_user={googleUser!}
            role={role}
            />
            
            </>
        );
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Sedang memproses login, mohon tunggu...</p>
        </div>
    );
}