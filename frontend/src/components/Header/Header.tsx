import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t('app.title')}</h1>
      <LanguageSwitcher />
    </header>
  );
};

export default Header;
