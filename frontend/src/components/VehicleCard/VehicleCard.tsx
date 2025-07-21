import styles from './VehicleCard.module.scss';
import Speedometer from '../Speedometer/Speedometer';
import { useTranslation } from 'react-i18next';

interface Props {
  plate: string;
  vin: string;
  color: string;
  pictureUrl?: string;
  visible: boolean;
  currentSpeed?: number;
}

export default function VehicleCard({
  plate,
  vin,
  color,
  pictureUrl,
  visible,
  currentSpeed,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={`${styles.vehicleCard} ${visible ? styles.visible : null}`}>
      {pictureUrl && (
        <img src={pictureUrl} alt={t('vehicle.imageAlt', { plate })} className={styles.vehicleImage} />
      )}
      <div className={styles.vehicleDetails}>
        <div>
          <p>
          <strong>{t('vehicle.plate')}:</strong> {plate}
          </p>
          <p>
          <strong>{t('vehicle.vin')}:</strong> {vin}
          </p>
          <div className={styles.vehicleColorWrapper}>
            <span className={styles.colorLabel}>
            <strong>{t('vehicle.color')}:</strong>
            </span>
            <span className={styles.vehicleColor} style={{ backgroundColor: color }}></span>
          </div>
        </div>
        {currentSpeed !== undefined && (
          <div className={styles.speedWrapper}>
            <Speedometer speed={Math.max(0, Math.round(currentSpeed))} />
          </div>
        )}
      </div>
    </div>
  );
}
