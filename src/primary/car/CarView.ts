import { Car } from '@/domain/car/Car';
import { ServiceAction } from '@/domain/serviceAction/ServiceAction';
import { ServiceActionView } from '@/primary/serviceAction/ServiceActionView';

export class CarView {
    constructor(
        public readonly id: string,
        public readonly make: string,
        public readonly serviceActions: ServiceActionView[],
        public readonly updatedAt: string
    ) {}

    static fromDomain(car: Car) {
        const { id, make, updatedAt } = car.properties;

        // Map from ServiceActionProperties[] to ServiceAction[]
        const serviceActions = car.properties.serviceActions.map((props) =>
            ServiceAction.fromProperties(props)
        );

        const serviceActionsView = serviceActions.map((props) =>
            ServiceActionView.fromDomain(props)
        );

        const date = new Date(updatedAt.seconds * 1000).toLocaleString();
        return new CarView(id, make, serviceActionsView, date);
    }
}
