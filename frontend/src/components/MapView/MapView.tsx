// src/components/MapView/MapView.tsx
import { MapContainer, TileLayer, ZoomControl, Polyline, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import CarMarker from '../CarMarker/CarMarker';
import { useCarAnimation } from '../../hooks/useCarAnimation';
import destinationIconUrl from '../../assets/destination.svg';
import L from 'leaflet';
import stopIconUrl from '../../assets/stop_icon.png';

interface MapViewProps {
  coordinates: [number, number][] | null;
  gps?: {
    latitude: number;
    longitude: number;
    direction: number;
  }[];
  stopPoints?: [number, number, number][]; // <- Novo!
  animate?: boolean;
}

const destinationIcon = L.icon({
  iconUrl: destinationIconUrl,
  iconSize: [26, 26],
  iconAnchor: [13, 30],
});

const stopIcon = L.icon({
  iconUrl: stopIconUrl,
  iconSize: [26, 26],
  iconAnchor: [13, 30],
});

export default function MapView({ coordinates, gps, stopPoints, animate }: MapViewProps) {
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
    stopPoints: stopPoints ?? [],
    speed: 50,
    enabled: animate,
  });
  console.log('gps:', gps, direction);

  const [currentStop, setCurrentStop] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!currentPosition || !stopPoints || stopPoints.length === 0 || !gps || gps.length === 0) {
      setCurrentStop(null);
      return;
    }

    const [currLat, currLng] = currentPosition;

    const firstPoint = gps[0];
    const lastPoint = gps[gps.length - 1];

    const internalStops = stopPoints.filter(
      ([lon, lat, time]) =>
        !(
          lat === firstPoint.latitude &&
          lon === firstPoint.longitude &&
          time === firstPoint.acquisition_time_unix
        ) &&
        !(
          lat === lastPoint.latitude &&
          lon === lastPoint.longitude &&
          time === lastPoint.acquisition_time_unix
        )
    );

    const isStop = internalStops.find(([lon, lat]) => {
      const dist = Math.sqrt(Math.pow(lat - currLat, 2) + Math.pow(lon - currLng, 2));
      return dist < 0.0001;
    });

    if (isStop) {
      setCurrentStop([isStop[1], isStop[0]]); // [lat, lon]
    } else {
      setCurrentStop(null);
    }
  }, [currentPosition, stopPoints, gps]);

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
      {coordinates && coordinates.length > 0 && (
        <Marker position={coordinates[coordinates.length - 1]} icon={destinationIcon} />
      )}
      {currentPosition && (
        <CarMarker position={currentPosition} direction={direction}/>
      )}{' '}
      {currentStop && <Marker position={currentStop} icon={stopIcon} />}
    </MapContainer>
  );
}
