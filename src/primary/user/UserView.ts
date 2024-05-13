import { User } from '@/domain/user/User';

export class UserView {
    constructor(
        public readonly id: string,
        public readonly name: string
    ) {}

    static fromDomain(user: User) {
        const { id, name } = user.properties;

        return new UserView(id, name);
    }
}
