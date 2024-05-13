import { Car } from '@/domain/car/Car';
import { CarRepository } from '@/domain/car/repository/CarRepository';
import { CarToSave } from '@/domain/car/types';
import { ClientService } from '@/secondary/api/ClientService';
import { ApiCar } from '@/secondary/car/ApiCar';
import { ApiServiceAction } from '@/secondary/serviceAction/ApiServiceAction';

export class CarResource implements CarRepository {
    async getCars(): Promise<Car[]> {
        const responseCars = await ClientService.get<ApiCar>('cars');
        const responseServiceActions = await ClientService.get<ApiServiceAction>('serviceActions');

        responseCars.map((apiCar) => {
            const serviceActions = responseServiceActions.filter(
                (serviceAction) => serviceAction.carId === apiCar.id
            );
            apiCar.serviceActions = serviceActions;
        });

        const cars = responseCars.map((car) => {
            console.log('car', car);
            return Car.fromProperties(car);
        });

        return cars;
    }
    addCar(form: CarToSave): Promise<Car> {
        console.log(form);
        throw new Error('Method not implemented.');
    }
    updateCar(form: CarToSave): Promise<Car> {
        console.log(form);
        throw new Error('Method not implemented.');
    }
    deleteCar(carId: string): Promise<void> {
        console.log(carId);
        throw new Error('Method not implemented.');
    }
    getCurrentCar(): Car {
        throw new Error('Method not implemented.');
    }
    updateCurrentCarId(): Promise<Car> {
        throw new Error('Method not implemented.');
    }
}
