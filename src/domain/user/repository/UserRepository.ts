import type { User } from '@/domain/user/User';
import { UserToSave } from '@/domain/user/types';

export interface UserRepository {
    getCurrentUser(): Promise<User>;
    createUser(form: UserToSave): Promise<User>;
}
