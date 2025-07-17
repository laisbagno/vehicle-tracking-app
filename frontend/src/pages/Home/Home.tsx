import { useTranslation } from 'react-i18next'
import styles from './Home.module.scss';

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className={styles.home}>
        <div className={styles.home__container}>
            <h1 className={styles.home__title}>{t('app.title')}</h1>
            <button className={styles.home__button}>{t('start')}</button>
        </div>
    </div>
  )
}
