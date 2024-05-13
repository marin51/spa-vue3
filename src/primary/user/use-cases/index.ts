import { UserRepository } from '@/domain/user/repository/UserRepository';
import { GetUserUseCase } from './GetUserUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UserToSave } from '@/domain/user/types';

export class UserService {
    private readonly getUserUseCase: GetUserUseCase;
    private readonly createUserUseCase: CreateUserUseCase;

    constructor(userRepository: UserRepository) {
        this.getUserUseCase = new GetUserUseCase(userRepository);
        this.createUserUseCase = new CreateUserUseCase(userRepository);
    }

    async getCurrentUser() {
        return await this.getUserUseCase.execute();
    }

    async createUser(form: UserToSave) {
        return await this.createUserUseCase.execute(form);
    }
}
