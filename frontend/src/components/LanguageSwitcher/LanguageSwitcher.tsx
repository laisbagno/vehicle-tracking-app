import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-switcher-wrapper">
      <label htmlFor="language-select" className="visually-hidden">
        Selecione o idioma
      </label>
      <select
        id="language-select"
        className="language-switcher"
        value={i18n.language}
        onChange={handleChange}
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>

  );
};

export default LanguageSwitcher;