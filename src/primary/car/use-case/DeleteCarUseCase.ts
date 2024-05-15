import { CarRepository } from '@/domain/car/repository/CarRepository';

export class DeleteCarUseCase {
    constructor(private readonly carRepository: CarRepository) {}

    async execute(carId: string) {
        await this.carRepository.deleteCar(carId);
    }
}
