import { CarId, DateTime } from '@/domain/car/types';
import { ServiceAction } from '@/domain/serviceAction/ServiceAction';

export class ApiServiceAction {
    constructor(
        public readonly id: number,
        public readonly carId: CarId,
        public readonly repair: string,
        public readonly updatedAt: DateTime
    ) {}

    toDomain(): ServiceAction {
        return ServiceAction.fromProperties({
            id: this.id,
            carId: this.carId,
            repair: this.repair,
            updatedAt: this.updatedAt,
        });
    }
}
