import { User } from '@/domain/user/User';
import { UserRepository } from '@/domain/user/repository/UserRepository';
import { UserToSave } from '@/domain/user/types';
import { ClientService } from '@/secondary/api/ClientService';
import { ApiUser } from '@/secondary/user/ApiUser';

export class UserResource implements UserRepository {
    async createUser(form: UserToSave): Promise<User> {
        const response = await ClientService.post<UserToSave>('users', form);

        return User.fromProperties({ name: form.name, id: response.docId });
    }
    async getCurrentUser(): Promise<User> {
        const localUserData = localStorage.getItem('user');

        if (localUserData) {
            return User.fromProperties(JSON.parse(localUserData));
        }
        const userProperties = await ClientService.get<ApiUser>('users');

        const user = User.fromProperties(userProperties[0]);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }

    async updateUser(form: UserToSave, userId: string): Promise<User> {
        const response = await ClientService.update<UserToSave>('users', form, userId);
        const user = { name: form.name, id: response.docId };
        localStorage.setItem('user', JSON.stringify(user));

        return User.fromProperties(user);
    }
}
