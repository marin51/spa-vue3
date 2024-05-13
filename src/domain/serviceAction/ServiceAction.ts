import { ServiceActionProperties } from "@/domain/serviceAction/types";
import { CarId } from "@/domain/car/types";

export class ServiceAction {
    constructor(
        private readonly id: number,
        private readonly carId: CarId,
        private readonly repair: string,
        private readonly updatedAt: Date
    ) { }

    static fromProperties(properties: ServiceActionProperties) {
        const { id, carId, repair, updatedAt } = properties;

        return new ServiceAction(id, carId, repair, updatedAt);
    }

    get properties(): ServiceActionProperties {
        return {
            id: this.id,
            carId: this.carId,
            repair: this.repair,
            updatedAt: this.updatedAt,
        }
    }
}