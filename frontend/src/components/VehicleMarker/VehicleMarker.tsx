import { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import styles from './VehicleMarker.module.scss';

interface Coordinate {
  latitude: number;
  longitude: number;
  direcao: number;
}

interface VehicleMarkerProps {
  route: Coordinate[];
}

const VehicleMarker = ({ route }: VehicleMarkerProps) => {
  const [positionIndex, setPositionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prev) => (prev < route.length - 1 ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(interval);
  }, [route]);

  const current = route[positionIndex];

  const icon = L.divIcon({
    className: styles.sprite,
    html: `<div class="${styles.sprite}" style="background-position: ${getSpritePosition(
      current.direcao
    )}"></div>`,
    iconSize: [50, 50],
  });

  return <Marker position={[current.latitude, current.longitude]} icon={icon} />;
};

const getSpritePosition = (direcao: number) => {
  const index = Math.floor(direcao / 30);
  const x = -index * 50;
  return `${x}px 0`;
};

export default VehicleMarker;
