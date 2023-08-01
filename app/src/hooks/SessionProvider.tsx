'use client'

import { getSession } from 'next-auth/react';
import { CustomSession } from '@/types/SessionDataTypes';
import { useState, useEffect, createContext, useContext } from 'react';

type SessionData = {
    session: CustomSession | null;
    loading: boolean;
};

const Session = createContext<SessionData>({ session: null, loading: true });
export const useSession = () => useContext(Session);

export default function SessionProvider({
    children
}: {
    children: React.ReactNode
}): React.ReactNode {
    const [session, setSession] = useState<CustomSession | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchSession() {
            let session = await getSession().catch(() => {}) as CustomSession | null;
            // Forcibly set session to invalid
            // This happens when another user modifies the details of the current user.
            if (session?.error) session = null;
            setSession(session);
            setLoading(false);
        }

        fetchSession();
    }, []);

    return (
        <Session.Provider value={{ session, loading }}>
            {children}
        </Session.Provider>
    );
};
