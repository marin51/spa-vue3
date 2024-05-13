import { CarRepository } from '@/domain/car/repository/CarRepository';
import { CarView } from '@/primary/car/CarView';

export class GetCarsUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute() {
        const cars = await this.carRepository.getCars();

        return cars.map(CarView.fromDomain);
    }
}
