import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
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
        url={`https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=fy75DEz0GjZsgGUIX94X`}
        />
    </MapContainer>
  );
}
