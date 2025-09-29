import { PrismaClient } from '@prisma/client';
import { seedImages } from './image.seed';
import { seedProducts } from './product.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semillas...');

  try {
    // Ejecutar semillas en orden
    const imageCount = await seedImages();
    const productCount = await seedProducts();

    // Mostrar resumen
    const totalProducts = await prisma.product.count();
    const totalImages = await prisma.images.count();
    
    console.log('✅ Semillas completadas exitosamente!');
    console.log(`📊 Resumen:`);
    console.log(`   - Productos: ${totalProducts}`);
    console.log(`   - Imágenes: ${totalImages}`);
  } catch (error) {
    console.error('❌ Error al ejecutar semillas:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar semillas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
