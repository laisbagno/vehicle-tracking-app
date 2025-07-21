import api from './api';

export const getCourseData = async () => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados de rota:', error);
    return null;
  }
};
