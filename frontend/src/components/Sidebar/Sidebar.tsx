import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';
import Speedometer from '../Speedometer/Speedometer';
import { useState } from 'react';

// Simulação dos dados da API por enquanto
const vehicleInfo = {
  plate: 'BPZ4295',
  vin: '34405892075660',
  color: '#FFEB3B',
  picture: {
    address: 'https://s3.amazonaws.com/softruck.fleetview/production/picture/c571fb1e-3906-4ee3-b4c4-7be9ad031d33_Semtítulo.png'
  }
};

interface SidebarProps {
    onSelectVehicle: (vehicle: typeof vehicleInfo | null) => void;
  }

const Sidebar = ({ onSelectVehicle }: SidebarProps) => {
  const { t } = useTranslation();
  const [speed, setSpeed] = useState(60);

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(event.target.value);
    setSpeed(newSpeed);
  };

  return (
    <aside className={styles.sidebar}>
      <h2>{t('sidebar.title')}</h2>

      <div className={styles.section}>
        <label htmlFor="vehicle">{t('sidebar.selectVehicle') || 'Selecione o veículo'}</label>
        <select
          id="vehicle"
          name="vehicle"
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              onSelectVehicle(null); // limpa o card
            } else {
              onSelectVehicle(vehicleInfo); // simulação por enquanto
            }
          }}// simulação por enquanto
        >
          <option value="">{t('chooseOption')}</option>
          <option value={vehicleInfo.plate}>{vehicleInfo.plate}</option>
        </select>
      </div>

      <div className={styles.section}>
        <label htmlFor="route">{t('sidebar.selectRoute')}</label>
        <select id="route" name="route">
          <option value="">{t('chooseOption')}</option>
          {/* Adicione as opções reais dinamicamente depois */}
        </select>
      </div>

      <div className={styles.section}>
        <Speedometer speed={speed} />
      </div>

      <div className={styles.rangeWrapper}>
        <label htmlFor="speedRange">Velocidade:</label>
        <input
          type="range"
          id="speedRange"
          name="speedRange"
          min="0"
          max="120"
          step="1"
          value={speed}
          onChange={handleSpeedChange}
          style={{ '--progress': `${(speed / 120) * 100}%` } as React.CSSProperties}
        />
      </div>

      <button className={styles.button}>{t('sidebar.play')}</button>
    </aside>
  );
};

export default Sidebar;
