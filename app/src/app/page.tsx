import styles from './page.module.css'
import Leaderboards from './leaderboards'

export default function Home() {
  return (
    <main className={styles.main}>
      <div class="card">
        <div class="card-body">
          By Hopps Team
        </div>
      </div>
      <Leaderboards></Leaderboards>
    </main>
  )
}