import styles from './page.module.css'
import Leaderboards from './leaderboards'

export default function Home() {
  return (
    <main className={styles.main}>
      <Leaderboards></Leaderboards>
    </main>
  )
}
