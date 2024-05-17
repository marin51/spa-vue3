import { CarId, CarProperties } from '@/domain/car/types';
import { reactive } from 'vue';

export const carStore = {
    state: reactive({
        cars: [] as CarProperties[],
    }),
    getters: {
        getCars() {
            return carStore.state.cars as CarProperties[];
        },
    },
    mutations: {
        setCars(payload: CarProperties[]) {
            carStore.state.cars = payload;
        },
        setCar(payload: CarProperties) {
            const cars = [...carStore.getters.getCars()];
            const carToUpdateIndex = cars.findIndex((car) => car.id === payload.id);
            cars[carToUpdateIndex] = payload;
            carStore.state.cars = cars;
        },
        deleteCar(payload: CarId) {
            const cars: CarProperties[] = carStore.state.cars;
            const carToRemoveIndex = cars.findIndex((car) => car.id === payload);
            debugger;
            cars.splice(carToRemoveIndex, 1);
            carStore.state.cars = cars;
        },
    },
    actions: {
        updateCars(cars: CarProperties[]) {
            carStore.mutations.setCars(cars);
        },
        changeCar(car: CarProperties) {
            carStore.mutations.setCar(car);
        },
        removeCar(carId: CarId) {
            carStore.mutations.deleteCar(carId);
        },
        addCar(car: CarProperties) {
            const cars = [...carStore.getters.getCars()];
            cars.push(car);
            carStore.mutations.setCars(cars);
        },
    },
};
