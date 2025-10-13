import { Prisma, User as PrismaUser } from "@prisma/client";
import { User } from "../../../../domain/products/entities/user.entity";

export const UserMapper = {
  toDomain(row: PrismaUser): User {
    return new User(
      row.id,
      row.email,
      row.name,
      row.isActive,
      row.createdAt,
      row.updatedAt,
    );
  },

  toPrismaCreate(entity: User): Prisma.UserUncheckedCreateInput {
    return {
      email: entity.email,
      name: entity.name,
      isActive: entity.isActive,
    };
  },

  toPrismaUpdate(entity: User): Prisma.UserUncheckedUpdateInput {
    return {
      email: entity.email,
      name: entity.name,
      isActive: entity.isActive,
    };
  },
};
