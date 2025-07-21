
import type { ReactNode } from 'react';
import styles from './AppLayout.module.scss';
import Header from '../Header/Header';

interface Props {
  children: ReactNode;
  sidebar: ReactNode;
  vehicleCard?: ReactNode;
}

export default function AppLayout({ children, sidebar, vehicleCard }: Props) {
  return (
    <div className={styles['app-layout']}>
      <Header />
      <div className={styles.main}>
        <aside className={styles.sidebar}>{sidebar}</aside>
        <div className={styles['map-container']}>
          {children}
          {vehicleCard && <div className={styles.floatingCard}>{vehicleCard}</div>}
        </div>
      </div>
    </div>
  );
}
