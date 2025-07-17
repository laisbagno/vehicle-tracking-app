import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './DefaultLayout.module.scss';

const DefaultLayout = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.layout}>
        <header className={styles.layout__header}>
            <h1>{t('app.title')}</h1>
            <LanguageSwitcher />
        </header>
        <main className={styles.layout__main}>
            <Outlet />
        </main>
    </div>
  );
};

export default DefaultLayout;
