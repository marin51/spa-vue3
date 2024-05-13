import { Car } from '@/domain/car/Car';
import { CarToSave, CarId } from '@/domain/car/types';

export interface CarRepository {
    getCars(): Promise<Car[]>;

    addCar(form: CarToSave): Promise<Car>;

    updateCar(form: CarToSave): Promise<Car>;

    deleteCar(carId: CarId): Promise<void>;

    getCurrentCar(): Car;

    updateCurrentCarId(): Promise<Car>;
}
