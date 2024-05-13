import { ServiceAction } from "@/domain/serviceAction/ServiceAction";
import { UserId } from "@/domain/user/types";
import { CarId } from "@/domain/car/types";
import { ServiceActionToSave } from "@/domain/serviceAction/types";



export interface ServiceActionRepository {

    getServiceActions(userId: UserId, carId: CarId): Promise<ServiceAction[]>;

    createServiceAction(userId: UserId, carId: CarId, form: ServiceActionToSave): Promise<ServiceAction>;

    updateServiceAction(carId: CarId, form: ServiceActionToSave): Promise<ServiceAction>;

    deleteServiceAction(carId: CarId): Promise<void>;
}