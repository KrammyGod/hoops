'use client'
import { useState, useEffect } from 'react';
import { Spinner } from "react-bootstrap";
import useSession from '@/hooks/Auth';

// Pass in the component that should be rendered
// on authorization success. Otherwise will default
// authorization failure.
export default function useProtect(successNode : React.ReactNode): React.ReactNode {
    const [node, setNode] = useState<React.ReactNode>(null);
    const { session, loading } = useSession();

    // Error node that just displays no access
    // This can be changed to render a different component instead
    const errNode = <div className="centerContainer">Access Denied.</div>;
    // Spinner that appears in the middle of the screen when loading
    const spinner = <div className="centerContainer"><Spinner animation='grow'></Spinner></div>;

    useEffect(() => {
        if (loading) setNode(spinner);
        else if (!session) setNode(errNode);
        else setNode(successNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);

    return node;
};
