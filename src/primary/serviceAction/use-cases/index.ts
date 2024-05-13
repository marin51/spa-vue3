import { ServiceActionRepository } from "@/domain/serviceAction/repository/ServiceActionRepository";
import { CreateServiceActionUseCase } from "./CreateServiceActionUseCase";
import { GetServiceActionsUseCase } from "./GetServiceActionsUseCase";
import { UserRepository } from "@/domain/user/repository/UserRepository";
import { CarRepository } from "@/domain/car/repository/CarRepository";
import { UserId } from "@/domain/user/types";
import { CarId } from "@/domain/car/types";
import { ServiceActionToSave } from "@/domain/serviceAction/types";

export class ServiceActionService {
    private getServiceActionUseCase: GetServiceActionsUseCase
    private createServiceActionUseCase: CreateServiceActionUseCase

    constructor(
        readonly serviceActionRepository: ServiceActionRepository,
        readonly userRepository: UserRepository,
        readonly carRepository: CarRepository
    ) {
        this.getServiceActionUseCase = new GetServiceActionsUseCase(serviceActionRepository);
        this.createServiceActionUseCase = new CreateServiceActionUseCase(serviceActionRepository, userRepository, carRepository);
    }

    async getServiceActions(userId: UserId, carId: CarId) {
        return await this.getServiceActionUseCase.execute(userId, carId)
    }

    async createServiceAction(form: ServiceActionToSave) {
        return await this.createServiceActionUseCase.execute(form)
    }
}