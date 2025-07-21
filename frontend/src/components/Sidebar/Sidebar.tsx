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
    stopPoints?: [number, number, number][];
  }) => void;
  onStart?: () => void;
}

const Sidebar = ({ onSelectVehicle, onSelectRoute, onStart }: SidebarProps) => {
  const { t } = useTranslation();
  const [speed, setSpeed] = useState(60);
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<string>('');
  const [currentCourse, setCurrentCourse] = useState<(typeof routeData.courses)[0] | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

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

  function formatAddress(address: string) {
    const parts = address.split(',');
    const rua = parts[0]?.trim();
    const bairro = parts[1]?.trim();
    const cidade = parts.at(-3)?.trim();
    const estado = parts.at(-2)?.trim();

    return `${rua}, ${bairro} - ${cidade}/${estado}`;
  }

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
            if (value) {
              setSelectedVehicle(value);
              onSelectVehicle(routeData?.vehicle ?? null);
            } else {
              setSelectedVehicle(null);
              onSelectVehicle(null);
            }
          }}
        >
          <option value="">{t('chooseOption')}</option>
          {routeData?.vehicle && (
            <option value={routeData.vehicle.plate}>{routeData.vehicle.plate}</option>
          )}
        </select>
      </div>
      {selectedVehicle && (
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
                index === '' || index === 'all'
                  ? null
                  : (routeData?.courses[Number(index)] ?? null);

              setCurrentCourse(course); // <-- novo

              onSelectRoute({
                coordinates: course?.gps?.map((point) => [point.latitude, point.longitude]) ?? null,
                gps: course?.gps ?? null,
                stopPoints: course?.stop_points?.coordinates ?? [],
              });
            }}
          >
            {/* Escolher como padrão */}
            <option value="">{t('chooseOption')}</option>

            {/* Rotas individuais */}
            {routeData?.courses?.map((course, idx) => {
              return (
                <option key={idx} value={String(idx)}>
                  {`Rota ${idx + 1}  |  ${(course.distance / 1000).toFixed(1)}km - ${Math.ceil(course.duration / 60)}min`}
                </option>
              );
            })}
          </select>

          {currentCourse && currentCourse.gps.length > 0 && (
            <div className={styles.routeDetails}>
              <div className={styles.locationBlock}>
                <div className={styles.location}>
                  <span className={styles.label}>
                    <span className={styles.icon}>📍</span>
                    {formatAddress(currentCourse.gps[0].address)}
                  </span>
                </div>
                <div className={styles.location}>
                  <span className={styles.label}>
                    <span className={styles.icon}>🏁</span>
                    {formatAddress(currentCourse.gps.at(-1)?.address)}
                  </span>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div>
                  <strong>Duração:</strong> {Math.ceil(currentCourse.duration / 60)} min
                </div>
                <div>
                  <strong>Distância:</strong> {(currentCourse.distance / 1000).toFixed(1)} km
                </div>
                <div>
                  <strong>Data:</strong>{' '}
                  {new Date(currentCourse.start_at).toLocaleDateString('pt-BR')}
                </div>
                <div>
                  <strong>Hora:</strong>{' '}
                  {new Date(currentCourse.start_at).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          )}
          {/* <div className={styles.section}>
            <Speedometer speed={displaySpeed} />
          </div> */}

          {/* <div className={styles.rangeWrapper}>
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
          </div> */}
        </div>
      )}

      <button className={styles.button} onClick={onStart}>
        {t('sidebar.play')}
      </button>
    </aside>
  );
};

export default Sidebar;
