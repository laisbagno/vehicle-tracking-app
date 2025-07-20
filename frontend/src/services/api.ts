import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', 
});

export default api;

export interface Route {
    id: string;
    name: string;
  }
  
  export async function fetchRoutes() {
    const response = await fetch('http://localhost:3000/courses');
    if (!response.ok) {
      throw new Error('Erro ao buscar as rotas');
    }
    return response.json();
  }


export async function fetchVehicles() {
    const res = await fetch('http://localhost:3000/api/vehicles');
    if (!res.ok) throw new Error('Erro ao buscar veículos');
    return res.json();
  }
  