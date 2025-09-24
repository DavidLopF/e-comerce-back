import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando semillas...');

  // Limpiar datos existentes
  await prisma.images.deleteMany();
  await prisma.product.deleteMany();
  console.log('🧹 Datos existentes eliminados');

  // Crear imágenes de ejemplo
  const images = await prisma.images.createMany({
    data: [
      {
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1586495777744-4413f71062ab?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500',
        type: 'product'
      },
      {
        url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        type: 'product'
      }
    ]
  });

  console.log(`📸 ${images.count} imágenes creadas`);

  // Crear productos de ejemplo
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Auriculares Inalámbricos Premium',
        slug: 'auriculares-inalambricos-premium',
        priceCents: 12999, // $129.99
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        active: true
      },
      {
        name: 'Reloj Inteligente Deportivo',
        slug: 'reloj-inteligente-deportivo',
        priceCents: 24999, // $249.99
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        active: true
      },
      {
        name: 'Zapatillas Running Pro',
        slug: 'zapatillas-running-pro',
        priceCents: 8999, // $89.99
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        active: true
      },
      {
        name: 'Cámara Digital 4K',
        slug: 'camara-digital-4k',
        priceCents: 59999, // $599.99
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
        active: true
      },
      {
        name: 'Laptop Gaming Ultra',
        slug: 'laptop-gaming-ultra',
        priceCents: 129999, // $1299.99
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
        active: true
      },
      {
        name: 'Smartphone Pro Max',
        slug: 'smartphone-pro-max',
        priceCents: 99999, // $999.99
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        active: true
      },
      {
        name: 'Tablet Profesional',
        slug: 'tablet-profesional',
        priceCents: 49999, // $499.99
        imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f71062ab?w=500',
        active: true
      },
      {
        name: 'Mochila Técnica',
        slug: 'mochila-tecnica',
        priceCents: 7999, // $79.99
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
        active: true
      },
      {
        name: 'Monitor 4K UltraWide',
        slug: 'monitor-4k-ultrawide',
        priceCents: 79999, // $799.99
        imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500',
        active: true
      },
      {
        name: 'Teclado Mecánico RGB',
        slug: 'teclado-mecanico-rgb',
        priceCents: 12999, // $129.99
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        active: true
      }
    ]
  });

  console.log(`🛍️ ${products.count} productos creados`);

  // Mostrar resumen
  const totalProducts = await prisma.product.count();
  const totalImages = await prisma.images.count();
  
  console.log('✅ Semillas completadas exitosamente!');
  console.log(`📊 Resumen:`);
  console.log(`   - Productos: ${totalProducts}`);
  console.log(`   - Imágenes: ${totalImages}`);
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar semillas:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
