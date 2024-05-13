import { User } from '@/domain/user/User';
import { UserRepository } from '@/domain/user/repository/UserRepository';
import { UserToSave } from '@/domain/user/types';
import { ClientService } from '@/secondary/api/ClientService';
import { ApiUser } from '@/secondary/user/ApiUser';

export class UserResource implements UserRepository {
    async createUser(form: UserToSave): Promise<User> {
        const response = await ClientService.post<UserToSave>('users', form);

        return User.fromProperties({ name: form.name, id: response.data.id });
    }
    async getCurrentUser(): Promise<User> {
        const userProperties = await ClientService.get<ApiUser>('users');

        return User.fromProperties(userProperties[0]);
    }
}
