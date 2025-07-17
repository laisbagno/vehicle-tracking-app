export async function getCourseData() {
    const response = await fetch('http://localhost:3000/courses');
    if (!response.ok) throw new Error('Erro ao buscar dados');
    return await response.json();
  }