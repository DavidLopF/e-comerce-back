import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProducts(storeId: string, categories: any[]) {
  console.log('🛍️ Creando productos...');

  // Limpiar productos existentes
  await prisma.product.deleteMany();
  console.log('🧹 Productos existentes eliminados');

  // Mapear categorías por nombre para fácil acceso
  const categoryMap = {
    audio: categories.find(c => c.name === 'Audio')?.id,
    electronica: categories.find(c => c.name === 'Electrónica')?.id,
    deportes: categories.find(c => c.name === 'Deportes')?.id,
    fotografia: categories.find(c => c.name === 'Fotografía')?.id,
    computadoras: categories.find(c => c.name === 'Computadoras')?.id,
    accesorios: categories.find(c => c.name === 'Accesorios')?.id,
  };

  // Crear productos de ejemplo
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Auriculares Inalámbricos Premium',
        slug: 'auriculares-inalambricos-premium',
        priceCents: 12999,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        description: 'Auriculares inalámbricos con cancelación de ruido activa y 30 horas de batería',
        active: true,
        discount: 15,
        storeId,
        categoryId: categoryMap.audio,
      },
      {
        name: 'Reloj Inteligente Deportivo',
        slug: 'reloj-inteligente-deportivo',
        priceCents: 24999,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        description: 'Reloj inteligente con GPS, monitor de frecuencia cardíaca y resistencia al agua',
        active: true,
        discount: 10,
        storeId,
        categoryId: categoryMap.deportes,
      },
      {
        name: 'Zapatillas Running Pro',
        slug: 'zapatillas-running-pro',
        priceCents: 8999,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        description: 'Zapatillas de running con tecnología de amortiguación avanzada',
        active: true,
        discount: 20,
        storeId,
        categoryId: categoryMap.deportes,
      },
      {
        name: 'Cámara Digital 4K',
        slug: 'camara-digital-4k',
        priceCents: 59999,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
        description: 'Cámara profesional con grabación 4K, estabilización de imagen y lente intercambiable',
        active: true,
        discount: 0,
        storeId,
        categoryId: categoryMap.fotografia,
      },
      {
        name: 'Laptop Gaming Ultra',
        slug: 'laptop-gaming-ultra',
        priceCents: 129999,
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500',
        description: 'Laptop gaming con RTX 4070, 32GB RAM, pantalla 144Hz',
        active: true,
        discount: 5,
        storeId,
        categoryId: categoryMap.computadoras,
      },
      {
        name: 'Smartphone Pro Max',
        slug: 'smartphone-pro-max',
        priceCents: 99999,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        description: 'Smartphone con cámara triple de 108MP, 5G y pantalla AMOLED de 6.7"',
        active: true,
        discount: 0,
        storeId,
        categoryId: categoryMap.electronica,
      },
      {
        name: 'Tablet Profesional',
        slug: 'tablet-profesional',
        priceCents: 49999,
        imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f71062ab?w=500',
        description: 'Tablet con stylus incluido, perfecta para diseño y productividad',
        active: true,
        discount: 10,
        storeId,
        categoryId: categoryMap.computadoras,
      },
      {
        name: 'Mochila Técnica',
        slug: 'mochila-tecnica',
        priceCents: 7999,
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
        description: 'Mochila impermeable con compartimento para laptop de hasta 17"',
        active: true,
        discount: 0,
        storeId,
        categoryId: categoryMap.accesorios,
      },
      {
        name: 'Monitor 4K UltraWide',
        slug: 'monitor-4k-ultrawide',
        priceCents: 79999,
        imageUrl: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500',
        description: 'Monitor ultrawide de 34" con resolución 4K y HDR',
        active: true,
        discount: 15,
        storeId,
        categoryId: categoryMap.computadoras,
      },
      {
        name: 'Teclado Mecánico RGB',
        slug: 'teclado-mecanico-rgb',
        priceCents: 12999,
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
        description: 'Teclado mecánico con switches Cherry MX e iluminación RGB personalizable',
        active: true,
        discount: 0,
        storeId,
        categoryId: categoryMap.accesorios,
      }
    ]
  });

  console.log(`🛍️ ${products.count} productos creados`);
  return products.count;
}