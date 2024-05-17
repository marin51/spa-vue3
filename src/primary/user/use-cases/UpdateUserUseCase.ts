import { UserRepository } from '@/domain/user/repository/UserRepository';
import { UserView } from '@/primary/user/UserView';
import { UserToSave } from '@/domain/user/types';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(form: UserToSave, userId: string): Promise<UserView> {
        const user = await this.userRepository.updateUser(form, userId);

        return UserView.fromDomain(user);
    }
}
