import I18n from 'react-native-i18n';

import it from './locales/it';
import en from './locales/en';

I18n.fallbacks = true;

// Alcune chiavi delle nostre traduzioni finiscono col punto,
// quindi dobbiamo cambiare separatore, che di default e' proprio "."
I18n.defaultSeparator = '#';

I18n.translations = {
  it: it,
  en: en,
};

export default I18n;
