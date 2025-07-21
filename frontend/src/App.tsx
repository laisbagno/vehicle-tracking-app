import 'leaflet/dist/leaflet.css';
import './styles/global.scss';
import { AppRoutes } from './routes/AppRoutes';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('app.title');
  }, [t]);
  return <AppRoutes />;
}

export default App;
