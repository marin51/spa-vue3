import { CarRepository } from '@/domain/car/repository/CarRepository';
import { ServiceActionRepository } from '@/domain/serviceAction/repository/ServiceActionRepository';
import { ServiceActionToSave } from '@/domain/serviceAction/types';
import { UserRepository } from '@/domain/user/repository/UserRepository';
import { ServiceActionView } from '@/primary/serviceAction/ServiceActionView';

export class CreateServiceActionUseCase {
    constructor(
        private readonly serviceActionRepository: ServiceActionRepository,
        private readonly userRepository: UserRepository,
        private readonly carRepository: CarRepository
    ) {}

    async execute(form: ServiceActionToSave): Promise<ServiceActionView> {
        const userId = (await this.userRepository.getCurrentUser()).properties.id;
        const carId = this.carRepository.getCurrentCar().properties.id;

        const serviceAction = await this.serviceActionRepository.createServiceAction(
            userId,
            carId,
            form
        );

        return ServiceActionView.fromDomain(serviceAction);
    }
}
