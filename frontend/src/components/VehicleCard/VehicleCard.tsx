import styles from './VehicleCard.module.scss';
import Speedometer from '../Speedometer/Speedometer';

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
  return (
    <div className={`${styles.vehicleCard} ${visible ? styles.visible : null}`}>
      {pictureUrl && (
        <img src={pictureUrl} alt={`Veículo ${plate}`} className={styles.vehicleImage} />
      )}
      <div className={styles.vehicleDetails}>
        <div>
          <p>
            <strong>PLACA:</strong> {plate}
          </p>
          <p>
            <strong>VIN:</strong> {vin}
          </p>
          <div className={styles.vehicleColorWrapper}>
            <span className={styles.colorLabel}>
              <strong>COR:</strong>
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
