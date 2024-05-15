import { CarRepository } from '@/domain/car/repository/CarRepository';
import { GetCarsUseCase } from './use-case/GetCarsUseCase';
import { CreateCarUseCase } from './use-case/CreateCarUseCase';
import { UserRepository } from '@/domain/user/repository/UserRepository';
import { CarToSave } from '@/domain/car/types';
import { UpdateCarUseCase } from './use-case/UpdateCarUseCase';
import { DeleteCarUseCase } from './use-case/DeleteCarUseCase';

export class CarService {
    private getCarsUseCase: GetCarsUseCase;
    private createCarUseCase: CreateCarUseCase;
    private updateCarUseCase: UpdateCarUseCase;
    private deleteCarUseCase: DeleteCarUseCase;

    constructor(
        readonly carRepository: CarRepository,
        readonly userRepository: UserRepository
    ) {
        this.getCarsUseCase = new GetCarsUseCase(carRepository);
        this.createCarUseCase = new CreateCarUseCase(carRepository);
        this.updateCarUseCase = new UpdateCarUseCase(carRepository);
        this.deleteCarUseCase = new DeleteCarUseCase(carRepository);
    }

    async getCars() {
        return await this.getCarsUseCase.execute();
    }
    async createCar(carToSave: CarToSave) {
        return await this.createCarUseCase.execute(carToSave);
    }

    async updateCar(carToSave: CarToSave, carId: string) {
        return await this.updateCarUseCase.execute(carToSave, carId);
    }

    async deleteCar(carId) {
        return await this.deleteCarUseCase.execute(carId);
    }
}
