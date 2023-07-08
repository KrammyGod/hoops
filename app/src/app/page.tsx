import styles from './page.module.css'
import Leaderboards from './leaderboards'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          By Hoops Team
        </div>
      </div>
      <Leaderboards></Leaderboards>
    </main>
  )
}
