'use client'

import styles from './page.module.css';
import Leaderboards from './leaderboards';
import { useState } from 'react';
import { getSession } from 'next-auth/react';

export default function Home() {
  const session = getSession();
  const [welcomeMsg, setWelcomeMsg] = useState('');

  session.then(data => {
    if (data?.user) {
      setWelcomeMsg(`Hi ${data.user.name}! Welcome to your dashboard.`);
    } else {
      setWelcomeMsg('');
    }
  });

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
