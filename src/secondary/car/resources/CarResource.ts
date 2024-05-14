import { Car } from '@/domain/car/Car';
import { CarRepository } from '@/domain/car/repository/CarRepository';
import { CarId, CarToSave } from '@/domain/car/types';
import { ClientService } from '@/secondary/api/ClientService';
import { ApiCar } from '@/secondary/car/ApiCar';
import { ApiServiceAction } from '@/secondary/serviceAction/ApiServiceAction';
import { carStore } from './CarStore';

export class CarResource implements CarRepository {
    async getCars(): Promise<Car[]> {
        // Get cars for user
        const responseCars = await ClientService.get<ApiCar>('cars');
        // Get service actions for user
        const responseServiceActions = await ClientService.get<ApiServiceAction>('serviceActions');

        // Create ApiCar Class instance from response
        const apiCars = responseCars.map(
            (car) => new ApiCar(car.id, car.make, car.serviceActions, car.updatedAt)
        );

        // Create ApiServiceAction Class instance from response
        const apiServiceAction = responseServiceActions.map(
            (serviceAction) =>
                new ApiServiceAction(
                    serviceAction.id,
                    serviceAction.carId,
                    serviceAction.repair,
                    serviceAction.updatedAt
                )
        );

        // Map service actions to related car
        apiCars.map((car) => {
            const serviceActions = apiServiceAction.filter(
                (serviceAction) => serviceAction.carId === car.id
            );

            car.serviceActions = serviceActions;
        });

        // Finally create Car class from ApiCar
        const cars = apiCars.map((apiCar) => apiCar.toDomain());

        // Save Car properties in store
        carStore.actions.updateCars(cars.map((car) => car.properties));

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
    deleteCar(carId: CarId): Promise<void> {
        carStore.actions.removeCar(carId);
        throw new Error('Method not implemented.');
    }
    getCurrentCar(): Car {
        throw new Error('Method not implemented.');
    }
}
