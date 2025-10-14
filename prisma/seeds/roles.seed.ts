import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoles() {
  await prisma.roles.deleteMany();
  console.log('🧹 Roles existentes eliminados');

  const roles = await prisma.roles.createMany({
    data: [
      {
        name: 'admin-store',
        description: 'Admin de la tienda',
      },
      {
        name: 'user-store',
        description: 'Usuario de la tienda',
      },
      {
        name: 'super-admin',
        description: 'super admin',
      },
    ],
  });
  console.log('🎨 Creando roles...');
  return roles;
}
