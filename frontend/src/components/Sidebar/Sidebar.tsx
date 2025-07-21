import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';
import Speedometer from '../Speedometer/Speedometer';
import { fetchRoutes } from '../../services/api';
import type { RouteData } from '../../types/RouteData';
import { parseGpsToCoords } from '../../utils/parseGpsToCoords';

interface SidebarProps {
  onSelectVehicle: (vehicle: RouteData['vehicle'] | null) => void;
  onSelectRoute: (data: {
    coordinates: [number, number][] | null;
    gps: RouteData['courses'][0]['gps'] | null;
  }) => void;
  onStart?: () => void;
}

const Sidebar = ({ onSelectVehicle, onSelectRoute, onStart }: SidebarProps) => {
  const { t } = useTranslation();
  const [speed, setSpeed] = useState(60);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<string>('');

  useEffect(() => {
    fetchRoutes()
      .then((data) => {
        setRouteData(data);
        onSelectVehicle(null);
      })
      .catch((error) => {
        console.error('Erro ao buscar rotas:', error);
      });
  }, []);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value));
  };

  const selectedCourse =
    selectedCourseIndex === '' || selectedCourseIndex === 'all'
      ? null
      : routeData?.courses?.[Number(selectedCourseIndex)];

  const displaySpeed = selectedCourse?.speed_avg ?? routeData?.speed_avg ?? 0;

  console.log('routeData', routeData);

  return (
    <aside className={styles.sidebar}>
      <h2>{t('sidebar.title')}</h2>

      <div className={styles.section}>
        <label htmlFor="vehicle">{t('sidebar.selectVehicle')}</label>
        <select
          id="vehicle"
          name="vehicle"
          onChange={(e) => {
            const value = e.target.value;
            onSelectVehicle(value ? (routeData?.vehicle ?? null) : null);
          }}
        >
          <option value="">{t('chooseOption')}</option>
          {routeData?.vehicle && (
            <option value={routeData.vehicle.plate}>{routeData.vehicle.plate}</option>
          )}
        </select>
      </div>

      <div className={styles.section}>
        <label htmlFor="route">{t('sidebar.selectRoute')}</label>
        <select
          id="route"
          name="route"
          value={selectedCourseIndex}
          onChange={(e) => {
            const index = e.target.value;
            setSelectedCourseIndex(index);
            const course =
              index === '' || index === 'all' ? null : routeData?.courses[Number(index)];

            onSelectRoute({
              coordinates: course?.gps?.map((point) => [point.latitude, point.longitude]) ?? null,
              gps: course?.gps ?? null,
            });
          }}
        >
          {/* Escolher como padrão */}
          <option value="">{t('chooseOption')}</option>

          {/* Todas as rotas */}
          {routeData && (
            <option value="all">
              {`Todas as rotas  |  ${(routeData.total_distance / 1000).toFixed(1)}km - ${Math.ceil(routeData.total_time / 60)}min |
                ${new Date(routeData.accOn).toLocaleDateString('pt-BR')}`}
            </option>
          )}

          {/* Rotas individuais */}
          {routeData?.courses?.map((course, idx) => {
            const start = new Date(course.start_at);
            const formattedDate = start.toLocaleDateString('pt-BR');
            const formattedTime = start.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <option key={idx} value={String(idx)}>
                {`Rota ${idx + 1}  |  ${(course.distance / 1000).toFixed(1)}km - ${Math.ceil(course.duration / 60)}min |
                    ${formattedDate} - ${formattedTime}`}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.section}>
        <Speedometer speed={displaySpeed} />
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

      <button className={styles.button} onClick={onStart}>
        {t('sidebar.play')}
      </button>
    </aside>
  );
};

export default Sidebar;
