// src/types/RouteData.ts

export interface Course {
  id: number; // você pode gerar depois com base no índice
  distance: number;
  duration: number;
  speed_max: number;
  speed_avg: number;
  direction: string;
  coordinates: [number, number][];
  start_at: string;
}

export interface RouteData {
  accOn: string;
  total_time: number;
  total_distance: number;
  speed_max: number;
  speed_avg: number;
  stops: number;
  total_stop_time: number;
  gps_count: number;
  num_courses: number;
  perc_fixed: number;
  courses: Course[];
  vehicle: {
    plate: string;
    vin: string;
    color: string;
    picture: {
      address: string;
    };
  };
}
