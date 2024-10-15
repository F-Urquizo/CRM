import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from './SpanishMessages';

export const i18nProvider = polyglotI18nProvider(
    locale => spanishMessages, 'es'
);