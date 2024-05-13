import { User } from '@/domain/user/User';
import { UserId } from '@/domain/user/types';

export class ApiUser {
    constructor(
        public readonly id: UserId,
        public readonly name: string
    ) {}

    toDomain(): User {
        return User.fromProperties({
            id: this.id,
            name: this.name,
        });
    }
}
