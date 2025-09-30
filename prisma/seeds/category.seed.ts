import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCategories() {
  console.log('📁 Creando categorías...');

  // Limpiar categorías existentes
  await prisma.category.deleteMany();
  console.log('🧹 Categorías existentes eliminadas');

  // Crear categorías de ejemplo
  const categories = await prisma.category.createMany({
    data: [
      {
        name: 'Electrónica',
        description: 'Dispositivos electrónicos y gadgets',
        isActive: true,
      },
      {
        name: 'Computadoras',
        description: 'Laptops, desktops y accesorios',
        isActive: true,
      },
      {
        name: 'Audio',
        description: 'Auriculares, altavoces y audio profesional',
        isActive: true,
      },
      {
        name: 'Fotografía',
        description: 'Cámaras y equipo fotográfico',
        isActive: true,
      },
      {
        name: 'Deportes',
        description: 'Equipamiento deportivo y fitness',
        isActive: true,
      },
      {
        name: 'Accesorios',
        description: 'Accesorios y periféricos',
        isActive: true,
      }
    ]
  });

  console.log(`📁 ${categories.count} categorías creadas`);
  
  // Retornar las categorías para usar sus IDs
  const allCategories = await prisma.category.findMany();
  return allCategories;
}
