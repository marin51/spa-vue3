import { ServiceAction } from '@/domain/serviceAction/ServiceAction';

export class ServiceActionView {
    private constructor(
        public readonly id: number,
        public readonly carId: string,
        public readonly repair: string,
        public readonly updatedAt: string
    ) {}

    static fromDomain(serviceAction: ServiceAction) {
        const { id, carId, repair, updatedAt } = serviceAction.properties;

        const date = new Date(updatedAt.seconds * 1000).toLocaleString();
        return new ServiceActionView(id, carId, repair, date);
    }
}
