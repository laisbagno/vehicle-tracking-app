import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline, useMap } from 'react-leaflet';
import { useEffect } from 'react';

interface MapViewProps {
  coordinates: [number, number][] | null;
}

export default function MapView({ coordinates }: MapViewProps) {
  console.log('coordinates', coordinates);

  function RoutePolyline({ coordinates }: { coordinates: [number, number][] }) {
    const map = useMap();

    useEffect(() => {
      if (coordinates.length > 0) {
        map.fitBounds(coordinates);
      }
    }, [coordinates, map]);

    return <Polyline positions={coordinates} pathOptions={{ color: '#06449c', weight: 4 }} />;
  }

  return (
    <MapContainer
      center={[-19.9191, -43.9386]}
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
    </MapContainer>
  );
}
