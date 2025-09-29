import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedImages() {
  console.log('📸 Creando semillas de imágenes...');

  // Limpiar imágenes existentes
  await prisma.images.deleteMany();
  console.log('🧹 Imágenes existentes eliminadas');

  // Crear imágenes de ejemplo
  const images = await prisma.images.createMany({
    data: [
      {
        //hero image
        url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        type: 'hero',
      },
      {
        //HERO IMAGE
        url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        type: 'hero',
      },
      {
        //HERO IMAGE
        url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        type: 'hero',
      }
    ]
  });

  console.log(`📸 ${images.count} imágenes creadas`);
  return images.count;
}
