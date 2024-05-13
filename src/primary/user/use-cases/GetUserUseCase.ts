import { UserRepository } from '@/domain/user/repository/UserRepository';
import { UserView } from '@/primary/user/UserView';

export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute() {
        const user = await this.userRepository.getCurrentUser();
        return UserView.fromDomain(user);
    }
}
