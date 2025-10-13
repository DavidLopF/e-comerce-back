import { Injectable, Inject } from '@nestjs/common';
import { User } from "src/modules/domain/products/entities/user.entity";
import type { UserRepository } from "src/modules/domain/products/ports/user.repository";
import { USER_REPOSITORY } from "src/modules/domain/products/ports/user.repository";

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

    async getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    async createUser(user: User, storeId: string | null = null) {
        const userCreated = await this.userRepository.createUser(user);
        const userRole = await this.userRepository.createUserRole(
            user.email,
            storeId ?? '', // Ensure storeId is always a string
            await 
        );
    }

    async validateProfileComplete(email: string) {
        const user = await this.userRepository.getUserByEmail(email);
        return {
            isComplete: !!user,
            user: user || null
        };
    }
}

