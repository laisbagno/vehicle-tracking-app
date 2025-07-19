// src/components/VehicleCard/VehicleCard.tsx

import styles from './VehicleCard.module.scss';

interface Props {
  plate: string;
  vin: string;
  color: string;
  pictureUrl?: string;
  visible: boolean; // <- Adiciona aqui
}

export default function VehicleCard({ plate, vin, color, pictureUrl, visible }: Props) {
  return (
    <div
        className={`${styles.vehicleCard} ${styles['vehicle-fade']} ${
        visible ? styles['fade-in'] : styles['fade-out']
        }`}
    >      
    {pictureUrl && (
        <img
          src={pictureUrl}
          alt={`Veículo ${plate}`}
          className={styles.vehicleImage}
        />
      )}
      <div className={styles.vehicleDetails}>
        <p><strong>PLACA:</strong> {plate}</p>
        <p><strong>VIN:</strong> {vin}</p>
        <div className={styles.vehicleColorWrapper}>
          <span className={styles.colorLabel}><strong>COR:</strong></span>
          <span
            className={styles.vehicleColor}
            style={{ backgroundColor: color }}
          ></span>
        </div>
      </div>
    </div>
  );
}
