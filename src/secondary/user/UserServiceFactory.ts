import { UserService } from '@/primary/user/UserService';
import { UserResource } from './resources/UserResource';

export class UserServiceFactoty {
    static getUserService() {
        const userResource = new UserResource();
        return new UserService(userResource);
    }
}
