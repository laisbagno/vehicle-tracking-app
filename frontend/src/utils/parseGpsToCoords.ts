import type { GpsPoint } from '../types/RouteData';

export function parseGpsToCoords(gps: GpsPoint[]): [number, number][] {
  return gps.map((p) => [p.latitude, p.longitude]);
}