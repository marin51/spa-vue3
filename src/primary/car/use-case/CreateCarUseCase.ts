import { CarRepository } from '@/domain/car/repository/CarRepository';
import { CarToSave } from '@/domain/car/types';
import { CarView } from '@/primary/car/CarView';

export class CreateCarUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(carToSave: CarToSave) {
        const car = await this.carRepository.addCar(carToSave);
        return CarView.fromDomain(car);
    }
}
