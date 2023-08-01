'use client'

import { API } from '@/types/ApiRoute';
import { useSession } from '@/hooks/SessionProvider';
import { Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SignUpForm from './SignUpForm';
import styles from '../page.module.css';
import { signIn } from 'next-auth/react';

export default function SignUp() {
    const router = useRouter();
    const params = useSearchParams();
    const callbackUrl = params?.get('callbackUrl') ?? '/';
    const { session, loading } = useSession();
    const [node, setNode] = useState<React.ReactNode>(null);

    const spinner = <div className={styles.outerContainer}><Spinner animation='grow'></Spinner></div>;

    const handleSubmit = (event: any) => {
        const data = new FormData(event.target);
        event.preventDefault();
        event.stopPropagation();

        fetch(`${API}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.get('name'),
                email: data.get('email'),
                password: data.get('password')
            })
        })
        .then((res) => res.json())
        .then(() => router.push(`/login?signup=true&callbackUrl=${callbackUrl}`)) // Redirect user only after successful signup
        .catch((err) => {
            console.log(err)
        });
    }

    const handleClick = () => {
        signIn(undefined, { callbackUrl });
    }

    useEffect(() => {
        if (loading) setNode(spinner);
        // Force users back to homepage if they are already logged in
        else if (session) router.push('/');
        else setNode(
            <div className={styles.outerContainer}>
                <div className={styles.subContainer}>
                    <SignUpForm 
                        btns={
                            <div className={styles.rowContainer}>
                                <Button type='submit'>Sign Up</Button>
                                <p className={styles.space}>or</p>
                                <Button variant='secondary' onClick={handleClick}>Login</Button>
                            </div>
                        }
                        submit={handleSubmit}
                    />
                </div>
            </div>
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, loading]);

    return node;
}
