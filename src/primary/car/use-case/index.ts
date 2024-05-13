import { CarRepository } from '@/domain/car/repository/CarRepository';
import { GetCarsUseCase } from './GetCarsUseCase';
import { CreateCarUseCase } from './CreateCarUseCase';
import { UserRepository } from '@/domain/user/repository/UserRepository';
import { CarToSave } from '@/domain/car/types';

export class CarService {
    private getCarsUseCase: GetCarsUseCase;
    private createCarUseCase: CreateCarUseCase;

    constructor(
        readonly carRepository: CarRepository,
        readonly userRepository: UserRepository
    ) {
        this.getCarsUseCase = new GetCarsUseCase(carRepository);
        this.createCarUseCase = new CreateCarUseCase(carRepository);
    }

    async getCars() {
        return await this.getCarsUseCase.execute();
    }
    async createCar(carToSave: CarToSave) {
        return await this.createCarUseCase.execute(carToSave);
    }
}
