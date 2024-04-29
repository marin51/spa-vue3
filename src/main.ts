import { createApp, h } from 'vue';
import singleSpaVue from 'single-spa-vue';
import './style.css';

import App from './App.vue';
import { i18n } from './ui/i18n/';

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App);
        },
    },
    handleInstance(app) {
        app.use(i18n);
    },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
