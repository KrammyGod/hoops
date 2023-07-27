'use client'

import { useEffect, useState } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import useSession from '@hooks/Auth';
import LoginForm from './LoginForm';

function generateAlert(params : ReadonlyURLSearchParams | null) {
    if (params?.get('signup') === 'true') {
        return (
            <Alert dismissible variant='info' style={{ width: '100%', textAlign: 'center' }}>
                Login to your new account!
            </Alert>
        );
    } else if (params?.get('update') === 'true') {
        return (
            <Alert dismissible variant='info' style={{ width: '100%', textAlign: 'center' }}>
                Please login again to continue.
            </Alert>
        );
    }
}

export default function Login() {
    const params = useSearchParams();
    const router = useRouter();
    const [node, setNode] = useState<React.ReactNode>(null);
    const { session, loading } = useSession();

    const spinner = <div className='outerContainer'><Spinner animation='grow'></Spinner></div>;

    useEffect(() => {
        if (loading) setNode(spinner);
        // Force users back to homepage if they are already logged in
        else if (session) router.push('/');
        else setNode(
            <LoginForm params={params}>
                {generateAlert(params)}
            </LoginForm>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);
    
    return node;
}
