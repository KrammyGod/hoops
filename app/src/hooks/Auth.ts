'use client'
import { getSession, signOut, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { CustomSession } from '@/types/SessionDataTypes';

type SessionData = {
    session: CustomSession | null;
    loading: boolean;
};

export default function useSession(): SessionData {
    const [session, setSession] = useState<CustomSession | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchSession() {
            const session = await getSession().catch(() => {}) as CustomSession;
            // Forcibly log them out and then direct to login.
            // This happens when another user modifies the details of the current user.
            if (session?.error) {
                return signOut().then(signIn);
            }
            setSession(session);
            setLoading(false);
        }

        fetchSession();
    }, []);

    return { session, loading };
};
