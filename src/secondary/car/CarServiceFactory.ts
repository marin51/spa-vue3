import { CarService } from '@/primary/car/CarService';
import { UserResource } from '@/secondary/user/resources/UserResource';
import { CarResource } from './resources/CarResource';

export class CarServiceFactoty {
    static getCarService() {
        const carResource = new CarResource();
        const userResource = new UserResource();
        return new CarService(carResource, userResource);
    }
}
