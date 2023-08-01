'use client'

import { useSession } from '@/hooks/SessionProvider';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Leaderboards from './leaderboards';

export default function Home() {
    const { session } = useSession();
    const [welcomeMsg, setWelcomeMsg] = useState('');

    useEffect(() => {
        if (session?.user) {
            setWelcomeMsg(`Hi ${session.user.name}! Welcome to your dashboard.`);
        } else {
            setWelcomeMsg('');
        }
    }, [session]);

    return (
        <main className={styles.main}>
            <div className={styles.stack}>
                <h3>{welcomeMsg}</h3>
                <Leaderboards></Leaderboards>
            </div>
            <footer className={styles.footer}>
                <p className={styles.p}>By the Hoops Team</p>
            </footer>
        </main>
    );
}
