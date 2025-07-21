import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import SPRITE_URL from '../../assets/car-sprite.png';

interface CarMarkerProps {
  position: [number, number];
  direction: number;
}

const TOTAL_FRAMES = 120;
const FRAME_WIDTH = 42;
const FRAME_HEIGHT = 41;

export default function CarMarker({ position, direction }: CarMarkerProps) {
  const map = useMap();

  useEffect(() => {
    const zoom = map.getZoom();
    const referenceZoom = 17;
    const baseScale = 1;
    const scale = Math.max(0.5, Math.min(1.2, baseScale * (zoom / referenceZoom)));

    const adjustedAngle = (420 - direction) % 360;
    const degreesPerFrame = 420 / TOTAL_FRAMES;
    const frameIndex = Math.round(adjustedAngle / degreesPerFrame) % TOTAL_FRAMES;

    const icon = L.divIcon({
      className: 'car-icon-adjusted',
      html: `
        <div
          style="
            width: ${FRAME_WIDTH}px;
            height: ${FRAME_HEIGHT}px;
            background-image: url('${SPRITE_URL}');
            background-size: ${FRAME_WIDTH * TOTAL_FRAMES}px ${FRAME_HEIGHT}px;
            background-position: -${frameIndex * FRAME_WIDTH}px 0;
            transform: scale(${scale});
            transform-origin: center;
          "
        ></div>
      `,
      iconSize: [FRAME_WIDTH * scale, FRAME_HEIGHT * scale],
      iconAnchor: [(FRAME_WIDTH * scale) / 2, (FRAME_HEIGHT * scale) / 2],
    });

    const marker = L.marker(position, { icon }).addTo(map);

    return () => {
      map.removeLayer(marker);
    };
  }, [map, position, direction]);

  return null;
}
