'use client'

import styles from './page.module.css'
import Leaderboards from './leaderboards'
import { useAuth } from './auth'
import { useEffect, useState } from 'react'

export default function Home() {
  const { username, auth } = useAuth()

  const [welcomeMsg, setWelcomeMsg] = useState("")
  useEffect(() => {
    if (auth) {
      setWelcomeMsg(`Hi ${username}! Welcome to your dashboard.`)
    } else {
      setWelcomeMsg("")
    }
  }, [username, auth])

  return (
    <main className={styles.main}>
      <div className={styles.stack}>
        <h3>{welcomeMsg}</h3>
        <Leaderboards></Leaderboards>
      </div>

    </main>
  )
}
