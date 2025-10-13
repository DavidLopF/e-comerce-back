import { Injectable } from '@nestjs/common';
import { UserRepository } from "src/modules/domain/products/ports/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/modules/domain/products/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { UserRole } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) {}
    async createUserRole(email: string, storeId: string, roleId: string): Promise<UserRole> {
        try{
            const user = await this.getUserByEmail(email) as User;
            if(!user){
                throw new Error('User not found');
            }
            const userRole = await this.prisma.userRole.create({
                data: {
                    userId: user.id,
                    storeId: storeId,
                    roleId: roleId,
                },
            });
            return userRole;
        }catch(error){
            throw new Error(error);
        }
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        return user ? UserMapper.toDomain(user) : null;
    }

    async createUser(user: User): Promise<User> {
        const created = await this.prisma.user.create({
            data: UserMapper.toPrismaCreate(user),
        });
        return UserMapper.toDomain(created);
    }

    async updateUser(user: User): Promise<User> {
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: UserMapper.toPrismaUpdate(user),
        });
        return UserMapper.toDomain(updated);
    }

    async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user ? UserMapper.toDomain(user) : null;
    }

    async validateProfileCompete(email: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        return user ? true : false;
    }
}   