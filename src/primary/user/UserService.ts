import { UserRepository } from '@/domain/user/repository/UserRepository';
import { GetUserUseCase } from '@/primary/user/use-cases/GetUserUseCase';
import { UpdateUserUseCase } from '@/primary/user/use-cases/UpdateUserUseCase';
import { CreateUserUseCase } from '@/primary/user/use-cases/CreateUserUseCase';
import { UserToSave } from '@/domain/user/types';

export class UserService {
    private readonly getUserUseCase: GetUserUseCase;
    private readonly createUserUseCase: CreateUserUseCase;
    private readonly updateUserUseCase: UpdateUserUseCase;

    constructor(userRepository: UserRepository) {
        this.getUserUseCase = new GetUserUseCase(userRepository);
        this.createUserUseCase = new CreateUserUseCase(userRepository);
        this.updateUserUseCase = new UpdateUserUseCase(userRepository);
    }

    async getCurrentUser() {
        return await this.getUserUseCase.execute();
    }

    async createUser(form: UserToSave) {
        return await this.createUserUseCase.execute(form);
    }
    async updateUser(form: UserToSave, userId: string) {
        return await this.updateUserUseCase.execute(form, userId);
    }
}
