// src/components/MapView/MapView.tsx
import { MapContainer, TileLayer, ZoomControl, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import CarMarker from '../CarMarker/CarMarker';
import { useCarAnimation } from '../../hooks/useCarAnimation';

interface MapViewProps {
  coordinates: [number, number][] | null;
  gps?: {
    latitude: number;
    longitude: number;
    direction: number;
  }[];
  animate?: boolean;
}

export default function MapView({ coordinates, gps, animate }: MapViewProps) {
  console.log('GPS PASSED:', gps);
  function RoutePolyline({ coordinates }: { coordinates: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
      if (coordinates.length > 0) {
        map.fitBounds(coordinates);
      }
    }, [coordinates, map]);

    return <Polyline positions={coordinates} pathOptions={{ color: '#06449c', weight: 4 }} />;
  }

  const { currentPosition, direction } = useCarAnimation({
    gpsPoints: gps ?? [],
    speed: 500,
    enabled: animate,
  });
  console.log('CAR POSITION:', currentPosition, direction);

  return (
    <MapContainer
      center={[-23.913509, -46.278702]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a>'
        url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=fy75DEz0GjZsgGUIX94X"
      />
      {coordinates && <RoutePolyline coordinates={coordinates} />}
      {currentPosition && <CarMarker position={currentPosition} direction={direction} />}{' '}
    </MapContainer>
  );
}
