import { UserRepository } from '@/domain/user/repository/UserRepository';
import { UserView } from '@/primary/user/UserView';
import { UserToSave } from '@/domain/user/types';

export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(form: UserToSave): Promise<UserView> {
        const user = await this.userRepository.createUser(form);

        return UserView.fromDomain(user);
    }
}
