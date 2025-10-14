import { UserRoleRepository } from 'src/modules/domain/products/ports/role.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolePrismaRepository implements UserRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRoleByName(name: string): Promise<string> {
    const role = await this.prisma.roles.findFirst({
      where: { name },
    });
    return role?.id || '';
  }
}
