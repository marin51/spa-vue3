import { Car } from '@/domain/car/Car';
import { CarRepository } from '@/domain/car/repository/CarRepository';
import { CarId, CarToSave } from '@/domain/car/types';
import { ClientService, PostResponse } from '@/secondary/api/ClientService';
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
        const apiServiceActions = responseServiceActions.map(
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
            const serviceActions = apiServiceActions.filter(
                (serviceAction) => serviceAction.carId === car.id
            );

            car.serviceActions = serviceActions;
        });

        // Finally create Car class from ApiCar
        const cars = apiCars.map((apiCar) => apiCar.toDomain());

        // Save Cars properties in store
        carStore.actions.updateCars(cars.map((car) => car.properties));

        return cars;
    }
    async addCar(form: CarToSave): Promise<Car> {
        const dataToSave = {
            make: form.make,
            updatedAt: form.updatedAt,
        };

        const response = (await ClientService.post('cars', dataToSave)) as PostResponse;

        // Create ApiCar Class instance from response
        const apiCar = new ApiCar(response.docId, form.make, [], form.updatedAt);

        // Finally create Car class from ApiCar
        const car = apiCar.toDomain();

        // Save Car properties in store
        carStore.actions.addCar(car.properties);
        return car;
    }
    async updateCar(form: CarToSave, carId: string): Promise<Car> {
        console.log(form);
        const dataToUpdate = {
            make: form.make,
            updatedAt: form.updatedAt,
        };

        const response = (await ClientService.update('cars', dataToUpdate, carId)) as PostResponse;

        const apiServiceActions = form.serviceActions.map(
            (serviceAction) =>
                new ApiServiceAction(
                    serviceAction.id,
                    serviceAction.carId,
                    serviceAction.repair,
                    serviceAction.updatedAt
                )
        );

        const apiCar = new ApiCar(response.docId, form.make, apiServiceActions, form.updatedAt);

        // Finally create Car class from ApiCar
        const car = apiCar.toDomain();

        // Save Car properties in store
        carStore.actions.changeCar(car.properties);
        return car;
    }
    async deleteCar(carId: CarId): Promise<void> {
        await ClientService.delete('cars', carId);
        carStore.actions.removeCar(carId);
    }
}
