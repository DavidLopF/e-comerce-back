import { PrismaClient } from '@prisma/client';
import { seedImages } from './image.seed';
import { seedStore } from './store.seed';
import { seedCategories } from './category.seed';
import { seedProducts } from './product.seed';
import { seedHeroSlides } from './hero-slides.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semillas...');

  try {
    // 1. Crear tienda principal
    const store = await seedStore();
    
    // 2. Crear categorías
    const categories = await seedCategories();
    
    // 3. Crear productos (necesita storeId y categorías)
    const productCount = await seedProducts(store.id, categories);
    
    // 4. Crear imágenes hero
    const imageCount = await seedImages();
    
    // 5. Crear slides del hero
    const heroSlideCount = await seedHeroSlides(store.id);

    // Mostrar resumen
    const totalProducts = await prisma.product.count();
    const totalImages = await prisma.images.count();
    const totalCategories = await prisma.category.count();
    const totalHeroSlides = await prisma.heroSlide.count();
    
    console.log('\n✅ Semillas completadas exitosamente!');
    console.log('📊 Resumen:');
    console.log(`   - Tiendas: 1`);
    console.log(`   - Categorías: ${totalCategories}`);
    console.log(`   - Productos: ${totalProducts}`);
    console.log(`   - Imágenes: ${totalImages}`);
    console.log(`   - Hero Slides: ${totalHeroSlides}`);
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