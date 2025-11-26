import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/persistence/prisma/prisma.service';

export interface UserRole {
  role: {
    name: string;
  };
  store: {
    id: string;
    name: string;
  };
}

@Injectable()
export class AuthorizationService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserRolesByEmail(email: string): Promise<UserRole[]> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
            store: true,
          },
        },
      },
    });

    return user?.userRoles || [];
  }

  async isSuperAdmin(email: string): Promise<boolean> {
    const userRoles = await this.getUserRolesByEmail(email);
    return userRoles.some(
      (userRole) =>
        userRole.role.name.toLowerCase() === 'super_admin' ||
        userRole.role.name.toLowerCase() === 'superadmin',
    );
  }

  async isStoreAdmin(email: string, storeId?: string): Promise<boolean> {
    const userRoles = await this.getUserRolesByEmail(email);

    if (storeId) {
      // Verificar si es admin de la tienda específica
      return userRoles.some(
        (userRole) =>
          userRole.store.id === storeId &&
          (userRole.role.name.toLowerCase() === 'admin' ||
            userRole.role.name.toLowerCase() === 'store_admin'),
      );
    }

    // Verificar si es admin de alguna tienda
    return userRoles.some(
      (userRole) =>
        userRole.role.name.toLowerCase() === 'admin' ||
        userRole.role.name.toLowerCase() === 'store_admin',
    );
  }

  async isAuthorized(email: string, storeId?: string): Promise<boolean> {
    const isSuperAdmin = await this.isSuperAdmin(email);
    if (isSuperAdmin) return true;

    return await this.isStoreAdmin(email, storeId);
  }

  async isAuthorizedBySlugOrId(
    email: string,
    storeSlug?: string,
    storeId?: string,
  ): Promise<boolean> {
    const isSuperAdmin = await this.isSuperAdmin(email);
    if (isSuperAdmin) return true;

    // Si tenemos storeId, lo usamos directamente
    if (storeId) {
      return await this.isStoreAdmin(email, storeId);
    }

    // Si tenemos storeSlug, primero obtenemos el storeId
    if (storeSlug) {
      const store = await this.prisma.store.findUnique({
        where: { slug: storeSlug },
      });

      if (!store) return false;

      return await this.isStoreAdmin(email, store.id);
    }

    // Si no tenemos ni storeId ni storeSlug, verificamos si es admin de alguna tienda
    return await this.isStoreAdmin(email);
  }
}
