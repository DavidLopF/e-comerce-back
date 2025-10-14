import { Injectable, Inject } from '@nestjs/common';
import { User } from 'src/modules/domain/products/entities/user.entity';
import type { UserRepository } from 'src/modules/domain/products/ports/user.repository';
import { USER_REPOSITORY } from 'src/modules/domain/products/ports/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject('ROLE_REPOSITORY')
    private readonly roleRepository: {
      getRoleByName(name: string): Promise<string>;
    },
    @Inject('STORE_REPOSITORY')
    private readonly storeRepository: {
      getBySlug(slug: string): Promise<any>;
    },
  ) {}

  async getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  async getRoles(email: string, storeSlug: string) {
    return this.userRepository.userRoles(email, storeSlug);
  }

  async getUserByFirebaseUid(firebaseUid: string) {
    return this.userRepository.getByFirebaseUid(firebaseUid);
  }

  async createUser(user: User, storeId: string | null = null) {
    try {
      const existingUser = await this.userRepository.getUserByEmail(user.email);

      if (existingUser) {
        // Usuario ya existe, solo actualizamos su información (no el rol)
        const updatedUser = existingUser.updateName(user.name);
        return await this.userRepository.updateUser(updatedUser);
      }

      const userCreated = await this.userRepository.createUser(user);

      if (storeId) {
        const store = await this.storeRepository.getBySlug(storeId);
        if (!store) {
          throw new Error(`Store with id ${storeId} not found`);
        }

        const roleId = await this.roleRepository.getRoleByName('user-store');
        if (!roleId) {
          throw new Error('Role "user-store" not found');
        }

        const userRole = await this.userRepository.createUserRole(
          user.email,
          store.id,
          roleId,
        );
      }

      return userCreated;
    } catch (error) {
      throw error;
    }
  }

  async validateProfileComplete(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    return {
      isComplete: !!user,
      user: user || null,
    };
  }
}
