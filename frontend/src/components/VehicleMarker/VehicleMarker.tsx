import { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
// import spriteImage from '../../assets/cars.png'; // ajuste se estiver em outro caminho
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
    }, 1000); // anima a cada segundo

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

// Função para ajustar a posição do sprite de acordo com a direção
const getSpritePosition = (direcao: number) => {
  const index = Math.floor(direcao / 30); // 12 direções possíveis
  const x = -index * 50; // supondo 50px de largura por frame
  return `${x}px 0`;
};

export default VehicleMarker;
