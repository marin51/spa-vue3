import { ServiceAction } from '@/domain/serviceAction/ServiceAction';
import { CarProperties, DateTime } from '@/domain/car/types';

export class Car {
    constructor(
        private readonly id: string,
        private readonly make: string,
        private readonly serviceActions: ServiceAction[],
        private readonly updatedAt: DateTime
    ) {}

    static fromProperties(props: CarProperties) {
        const { id, make, updatedAt } = props;
        const transformedServiceActions = props.serviceActions.map(ServiceAction.fromProperties);

        return new Car(id, make, transformedServiceActions, updatedAt);
    }

    get properties(): CarProperties {
        const transformedServiceActions = this.serviceActions.map((action) => action.properties);
        return {
            id: this.id,
            make: this.make,
            serviceActions: transformedServiceActions,
            updatedAt: this.updatedAt,
        };
    }

    transf;
}
