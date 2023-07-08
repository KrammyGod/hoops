import styles from './page.module.css'
import Leaderboards from './leaderboards'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="card">
        <div className="card-body">
          By Hoops Team
        </div>
      </div>
      <Leaderboards></Leaderboards>
    </main>
  )
}
