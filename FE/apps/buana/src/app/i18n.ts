import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { toast } from 'react-toastify';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {},
      },
      id: {
        translation: {},
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    return Promise.all([
      import(`../../public/locales/en.json`),
      import(`../../public/locales/id.json`),
    ]);
  })
  .then(([en, id]) => {
    i18n.addResourceBundle('en', 'translation', en, true, true);
    i18n.addResourceBundle('id', 'translation', id, true, true);
  })
  .catch((error) => {
    toast.error(error);
  });

export default i18n;
