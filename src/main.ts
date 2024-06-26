import { createApp, h } from 'vue';
import singleSpaVue from 'single-spa-vue';
import './style.css';

import App from './App.vue';
import { i18n } from './ui/i18n/';
import { UserServiceFactoty } from './secondary/user/UserServiceFactory';
import { CarServiceFactoty } from './secondary/car/CarServiceFactory';
const userService = UserServiceFactoty.getUserService();
const carService = CarServiceFactoty.getCarService();

const vueLifecycles = singleSpaVue({
    createApp,
    appOptions: {
        render() {
            return h(App);
        },
    },
    handleInstance(app) {
        app.use(i18n);
        // app.use(router);
        app.provide('userService', userService);
        app.provide('carService', carService);
    },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
