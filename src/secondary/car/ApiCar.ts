import { Car } from '@/domain/car/Car';
import { ApiServiceAction } from '@/secondary/serviceAction/ApiServiceAction';
import { DateTime } from '@/domain/car/types';

export class ApiCar {
    constructor(
        public readonly id: string,
        public readonly make: string,
        public serviceActions: ApiServiceAction[],
        public readonly updatedAt: DateTime
    ) {}

    toDomain(): Car {
        const serviceActions = this.serviceActions.map((serviceAction) => serviceAction.toDomain());

        return Car.fromProperties({
            id: this.id,
            make: this.make,
            serviceActions: serviceActions.map((serviceAction) => serviceAction.properties),
            updatedAt: this.updatedAt,
        });
    }
}
