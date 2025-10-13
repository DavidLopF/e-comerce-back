import { User } from "../entities/user.entity";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
    getUserById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getUserByEmail(email: string): Promise<User | null>;
}