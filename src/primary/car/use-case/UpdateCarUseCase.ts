import { CarRepository } from '@/domain/car/repository/CarRepository';
import { CarToSave } from '@/domain/car/types';
import { CarView } from '@/primary/car/CarView';

export class UpdateCarUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(carToSave: CarToSave, carId: string) {
        const car = await this.carRepository.updateCar(carToSave, carId);
        return CarView.fromDomain(car);
    }
}
