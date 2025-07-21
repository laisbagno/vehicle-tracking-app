import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Sidebar.module.scss';
import { fetchRoutes } from '../../services/api';
import type { RouteData } from '../../types/RouteData';

interface SidebarProps {
  onSelectVehicle: (vehicle: RouteData['vehicle'] | null) => void;
  onSelectRoute: (data: {
    coordinates: [number, number][] | null;
    gps: RouteData['courses'][0]['gps'] | null;
    stopPoints?: [number, number, number][];
  }) => void;
  onStart?: () => void;
  onReset?: () => void;
}

const Sidebar = ({ onSelectVehicle, onSelectRoute, onStart, onReset }: SidebarProps) => {
  const { t } = useTranslation();
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
                  {`${t('sidebar.route')} ${idx + 1}  |  ${(course.distance / 1000).toFixed(1)}km - ${Math.ceil(course.duration / 60)}min`}
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
                  <strong>{t('sidebar.duration')}:</strong> {Math.ceil(currentCourse.duration / 60)}{' '}
                  min
                </div>
                <div>
                  <strong>{t('sidebar.distance')}:</strong>{' '}
                  {(currentCourse.distance / 1000).toFixed(1)} km
                </div>
                <div>
                  <strong>{t('sidebar.date')}:</strong>{' '}
                  {new Date(currentCourse.start_at).toLocaleDateString('pt-BR')}
                </div>
                <div>
                  <strong>{t('sidebar.time')}:</strong>{' '}
                  {new Date(currentCourse.start_at).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          )}
          {selectedVehicle && selectedCourseIndex && (
            <div className={styles.buttons}>
              <button className={styles.button} onClick={onStart}>
                {t('sidebar.play')}
              </button>
              <button className={styles.button} onClick={onReset}>
                {t('sidebar.reset')}
              </button>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
