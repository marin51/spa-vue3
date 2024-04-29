import { createI18n } from 'vue-i18n';

import uk from './locales/en-GB.js';
import bg from './locales/bg-BG.js';

export const i18n = createI18n({
    locale: 'en-UK',
    messages: {
        'en-UK': uk,
        'bg-BG': bg,
    },
});
