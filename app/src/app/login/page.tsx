'use client'

import { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import useSession from '@/hooks/Auth';
import LoginForm from './LoginForm';

export default function Login({ searchParams } : { searchParams: any }) {
    const [node, setNode] = useState<React.ReactNode>(null);
    const { session, loading } = useSession();

    const errNode = <div className='outerContainer'>You are already logged in.</div>;
    const spinner = <div className='outerContainer'><Spinner animation='grow'></Spinner></div>;

    useEffect(() => {
        if (loading) setNode(spinner);
        else if (session) setNode(errNode);
        else setNode(
            <LoginForm params={searchParams}>
                {
                // If they came here from signing up
                (searchParams?.signup === 'true') ?
                    <Alert dismissible variant='info' style={{ width: '100%', textAlign: 'center' }}>
                        Login to your new account!
                    </Alert> : undefined
                }
            </LoginForm>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);
    
    return node;
}
