import { useEffect, useRef, useState } from 'react';

interface GpsPoint {
  latitude: number;
  longitude: number;
  direction: number;
}

interface UseCarAnimationProps {
  gpsPoints: GpsPoint[];
  speed: number; // milissegundos entre pontos
  enabled?: boolean;
}

function interpolate(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function useCarAnimation({ gpsPoints, speed, enabled = true }: UseCarAnimationProps) {
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<number>(290);
  const indexRef = useRef(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || gpsPoints.length < 2) return;

    indexRef.current = 0;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = elapsed / speed;

      const currentIndex = indexRef.current;
      const nextIndex = currentIndex + 1;

      if (nextIndex >= gpsPoints.length) {
        cancelAnimationFrame(requestRef.current!);
        return;
      }

      const current = gpsPoints[currentIndex];
      const next = gpsPoints[nextIndex];

      const lat = interpolate(current.latitude, next.latitude, progress);
      const lng = interpolate(current.longitude, next.longitude, progress);
      const dir = interpolate(current.direction, next.direction, progress);

      setCurrentPosition([lat, lng]);
      setDirection(dir);

      if (progress >= 1) {
        indexRef.current += 1;
        startTimeRef.current = timestamp;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gpsPoints, speed, enabled]);

  // Exibe o carro parado no início da rota
  useEffect(() => {
    if (gpsPoints.length > 0) {
      setCurrentPosition([gpsPoints[0].latitude, gpsPoints[0].longitude]);
      setDirection(gpsPoints[0].direction ?? 0);
    }
  }, [gpsPoints]);

  return { currentPosition, direction };
}
