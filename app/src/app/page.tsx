'use client'

import styles from './page.module.css'
import Leaderboards from './leaderboards'
import { useAuth } from './auth'

export default function Home() {
  const { username } = useAuth()
  return (
    <main className={styles.main}>
      <div className={styles.stack}>
        <h3>{`Hi ${username}! Welcome to your dashboard.`}</h3>
        <Leaderboards></Leaderboards>
      </div>

    </main>
  )
}
