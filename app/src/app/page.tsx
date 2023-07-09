'use client'

import styles from './page.module.css'
import Leaderboards from './leaderboards'
import { useAuth } from './auth'
import { useEffect, useState } from 'react'

export default function Home() {
  const { username, auth } = useAuth()
  const [name, setName] = useState("")
  useEffect(() => setName(username), [])
  return (
    <main className={styles.main}>
      <div className={styles.stack}>
        {auth ? <h3>{`Hi ${name}! Welcome to your dashboard.`}</h3> : ""}
        <Leaderboards></Leaderboards>
      </div>

    </main>
  )
}
