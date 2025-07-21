import styles from './Speedometer.module.scss';

interface SpeedometerProps {
  speed: number;
  maxSpeed?: number;
}

const Speedometer = ({ speed, maxSpeed = 120 }: SpeedometerProps) => {
  const rotation = (speed / maxSpeed) * 180 - 90;

  return (
    <div className={styles.speedometer}>
      <div className={styles.arc}>
        <div className={styles.pointer} style={{ transform: `rotate(${rotation}deg)` }} />
      </div>

      <div className={styles.markers}>
        {[0, 30, 60, 90, 120].map((val) => {
          const angle = (val / maxSpeed) * 180 - 180;
          const radius = 35;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={val}
              className={styles.marker}
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              {val}
            </div>
          );
        })}
      </div>

      <div className={styles.speedLabel}>{speed} km/h</div>
    </div>
  );
};

export default Speedometer;
