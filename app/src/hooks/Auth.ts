'use client'
import { getSession } from 'next-auth/react';
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
            const session = await getSession() as CustomSession;
            setSession(session);
            setLoading(false);
        }

        fetchSession();
    }, []);

    return { session, loading };
};