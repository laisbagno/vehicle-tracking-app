import { useEffect, useRef, useState } from 'react';

interface GpsPoint {
  latitude: number;
  longitude: number;
  direction: number;
  acquisition_time_unix: number;
}

interface UseCarAnimationProps {
  gpsPoints: GpsPoint[];
  stopPoints?: [number, number, number][];
  speed: number; 
  enabled?: boolean;
}

function interpolate(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function calculateBearing(start: [number, number], end: [number, number]): number {
  const [lat1, lon1] = start;
  const [lat2, lon2] = end;

  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const y = Math.sin(dLon) * Math.cos(lat2 * (Math.PI / 180));
  const x =
    Math.cos(lat1 * (Math.PI / 180)) * Math.sin(lat2 * (Math.PI / 180)) -
    Math.sin(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.cos(dLon);

  const brng = Math.atan2(y, x);
  return brng >= 0 ? (brng * 180) / Math.PI : (brng * 180) / Math.PI + 360;
}

export function useCarAnimation({
  gpsPoints,
  stopPoints = [],
  speed,
  enabled = true
}: UseCarAnimationProps) {
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const [speedValue, setSpeedValue] = useState<number>(0);

  const indexRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (gpsPoints.length > 0) {
      setCurrentPosition([gpsPoints[0].latitude, gpsPoints[0].longitude]);

      const next = gpsPoints[1];
      if (next) {
        const angle = calculateBearing(
          [gpsPoints[0].latitude, gpsPoints[0].longitude],
          [next.latitude, next.longitude]
        );
        setDirection(angle);
      } else {
        setDirection(gpsPoints[0].direction ?? 0);
      }
    } else {
      setCurrentPosition(null);
      setDirection(0);
    }
  }, [gpsPoints]);

  useEffect(() => {
    if (!enabled || gpsPoints.length < 2) return;

    indexRef.current = 0;
    lastTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;

      const i = indexRef.current;
      if (i >= gpsPoints.length - 1) return;

      const start = gpsPoints[i];
      const end = gpsPoints[i + 1];

      const isStopPoint = stopPoints.some(
        ([lon, lat, time]) =>
          lat === start.latitude &&
          lon === start.longitude &&
          time === start.acquisition_time_unix
      );

      if (isStopPoint && !pauseTimeoutRef.current) {
        pauseTimeoutRef.current = setTimeout(() => {
          pauseTimeoutRef.current = null;
          indexRef.current += 1;
          lastTimeRef.current = null;
          animationFrameRef.current = requestAnimationFrame(animate);
        }, 2000);
        return;
      }

      const elapsed = timestamp - lastTimeRef.current;
      const timeDelta = (end.acquisition_time_unix - start.acquisition_time_unix) * 1000;
      const adjustedDuration = timeDelta / speed;
      const progress = elapsed / adjustedDuration;

      const lat = interpolate(start.latitude, end.latitude, progress);
      const lng = interpolate(start.longitude, end.longitude, progress);
      setCurrentPosition([lat, lng]);

      const angle = calculateBearing([start.latitude, start.longitude], [end.latitude, end.longitude]);
      setDirection(angle);

      const interpolatedSpeed = interpolate(
        start.speed ?? end.speed ?? 0,
        end.speed ?? start.speed ?? 0,
        progress
      );

      setSpeedValue(interpolatedSpeed);
      if (progress >= 1) {
        indexRef.current += 1;
        lastTimeRef.current = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (pauseTimeoutRef.current !== null) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [gpsPoints, speed, enabled, stopPoints]);

  return { currentPosition, direction, speed: speedValue };
}
