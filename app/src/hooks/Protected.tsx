'use client'

import './styles.css';
import { signIn } from 'next-auth/react';
import { Spinner } from 'react-bootstrap';
import { useSession } from '@/hooks/SessionProvider';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

// Pass in the component that should be rendered
// on authorization success. Otherwise will default
// to bringing user into sign in page
export default function Protect(successNode : React.ReactNode): React.ReactNode {
    // This allows us to redirect the user back here
    // after returning from login page.
    const path = usePathname() ?? '/';
    const [node, setNode] = useState<React.ReactNode>(null);
    const { session, loading } = useSession();

    // Spinner that appears in the middle of the screen when loading
    const spinner = <div className='centerContainer'><Spinner animation='grow' /></div>;

    useEffect(() => {
        if (loading) setNode(spinner);
        else if (!session) signIn(undefined, { callbackUrl: path });
        else setNode(successNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);

    return node;
};
