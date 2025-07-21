import { useEffect, useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import Sidebar from '../../components/Sidebar/Sidebar';
import MapView from '../../components/MapView/MapView';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import type { Vehicle, GpsPoint } from '../../types/RouteData';
import { useCarAnimation } from '../../hooks/useCarAnimation';

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [visibleVehicle, setVisibleVehicle] = useState<Vehicle | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedRouteCoords, setSelectedRouteCoords] = useState<[number, number][] | null>(null);
  const [selectedRouteGps, setSelectedRouteGps] = useState<GpsPoint[] | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);
  const [stopPoints, setStopPoints] = useState<[number, number, number][]>([]);
  const { speed: currentSpeed } = useCarAnimation({
    gpsPoints: selectedRouteGps ?? [],
    stopPoints,
    speed: 50,
    enabled: startAnimation,
  });

  useEffect(() => {
    if (selectedVehicle) {
      setVisibleVehicle(selectedVehicle);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      const timeout = setTimeout(() => setVisibleVehicle(null), 300);
      return () => clearTimeout(timeout);
    }
  }, [selectedVehicle]);

  const handleResetRoute = () => {
    setStartAnimation(false);
    setTimeout(() => setStartAnimation(true), 100);
  };

  return (
    <AppLayout
      sidebar={
        <Sidebar
          onSelectVehicle={setSelectedVehicle}
          onSelectRoute={({ coordinates, gps, stopPoints }) => {
            setSelectedRouteCoords(coordinates);
            setSelectedRouteGps(gps);
            setStopPoints(stopPoints ?? []);
            setStartAnimation(false);
          }}
          onStart={() => setStartAnimation(true)}
          onReset={handleResetRoute}
        />
      }
      vehicleCard={
        selectedVehicle ? (
          <VehicleCard
            plate={selectedVehicle.plate}
            vin={selectedVehicle.vin}
            color={selectedVehicle.color}
            pictureUrl={selectedVehicle.picture?.address}
            visible={isVisible}
            currentSpeed={currentSpeed}
          />
        ) : null
      }
    >
      <MapView
        coordinates={selectedRouteCoords}
        gps={selectedRouteGps ?? undefined}
        stopPoints={stopPoints}
        animate={startAnimation}
      />
    </AppLayout>
  );
}
