import { useEffect, useState } from 'react';
import { getCourseData } from './services/api';

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getCourseData()
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Vehicle Tracking App</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
