'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import useSession from '@hooks/Auth';
import LoginForm from './LoginForm';

function generateAlert(searchParams : any) {
    if (searchParams?.signup === 'true') {
        return (
            <Alert dismissible variant='info' style={{ width: '100%', textAlign: 'center' }}>
                Login to your new account!
            </Alert>
        );
    } else if (searchParams?.update === 'true') {
        return (
            <Alert dismissible variant='info' style={{ width: '100%', textAlign: 'center' }}>
                Please login again to continue.
            </Alert>
        );
    }
}

export default function Login({ searchParams } : { searchParams: any }) {
    const router = useRouter();
    const [node, setNode] = useState<React.ReactNode>(null);
    const { session, loading } = useSession();

    const spinner = <div className='outerContainer'><Spinner animation='grow'></Spinner></div>;

    useEffect(() => {
        if (loading) setNode(spinner);
        // Force users back to homepage if they are already logged in
        else if (session) router.push('/');
        else setNode(
            <LoginForm params={searchParams}>
                {generateAlert(searchParams)}
            </LoginForm>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);
    
    return node;
}
