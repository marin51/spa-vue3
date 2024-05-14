import { CarId, CarProperties } from '@/domain/car/types';
import { reactive } from 'vue';

export const carStore = {
    state: reactive({
        cars: [] as CarProperties[],
    }),
    getters: {
        getCars() {
            return carStore.state.cars;
        },
    },
    mutations: {
        setCars(payload: CarProperties[]) {
            carStore.state.cars = payload;
        },
        deleteCar(payload: CarId) {
            const cars: CarProperties[] = carStore.state.cars;
            const carToRemoveIndex = cars.findIndex((car) => car.id === payload);
            cars.splice(carToRemoveIndex, 1);
            carStore.state.cars = cars;
        },
    },
    actions: {
        updateCars(cars: CarProperties[]) {
            carStore.mutations.setCars(cars);
        },
        removeCar(carId: CarId) {
            carStore.mutations.deleteCar(carId);
        },
    },
};
