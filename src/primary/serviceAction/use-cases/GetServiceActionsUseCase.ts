import { CarId } from '@/domain/car/types';
import { ServiceActionRepository } from '@/domain/serviceAction/repository/ServiceActionRepository';
import { UserId } from '@/domain/user/types';
import { ServiceActionView } from '@/primary/serviceAction/ServiceActionView';

export class GetServiceActionsUseCase {
    constructor(private readonly serviceActionRepository: ServiceActionRepository) {}

    async execute(userId: UserId, carId: CarId) {
        const serviceActions = await this.serviceActionRepository.getServiceActions(userId, carId);
        return serviceActions.map(ServiceActionView.fromDomain);
    }
}
