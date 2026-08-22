import { uz } from './uz';
import { ru } from './ru';
import { Language } from '../types';

export const translations = { uz, ru };

export function getTranslation(lang: Language) {
  return translations[lang] || translations.uz;
}
