import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedStore() {
  console.log('🏪 Creando tienda de ejemplo...');

  // Limpiar datos existentes
  await prisma.storeConfig.deleteMany();
  await prisma.socialMedia.deleteMany();
  await prisma.store.deleteMany();
  console.log('🧹 Tiendas existentes eliminadas');

  // Crear tienda principal
  const store = await prisma.store.create({
    data: {
      name: 'TechStore Pro',
      slug: 'techstore-pro',
      description: 'Tu tienda de tecnología y electrónica',
      slogan: 'Lo último en tecnología a tu alcance',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
      email: 'contacto@techstore.com',
      phone: '+1 234 567 890',
      isActive: true,
    }
  });

  // Crear configuración de la tienda
  await prisma.storeConfig.create({
    data: {
      storeId: store.id,
      theme: {
        colors: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          background: '#ffffff',
          text: '#1f2937',
          accent: '#f59e0b'
        },
        fonts: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif'
        }
      },
      features: {
        enableWishlist: true,
        enableReviews: true,
        enableChat: false,
        enableNewsletter: true
      },
      seo: {
        title: 'TechStore Pro - Tecnología de última generación',
        description: 'Encuentra los mejores productos de tecnología al mejor precio',
        keywords: 'tecnología, electrónica, computadoras, smartphones'
      },
      checkout: {
        enableGuestCheckout: true,
        requirePhoneNumber: true,
        showShippingEstimate: true
      },
      isActive: true
    }
  });

  // Crear redes sociales
  await prisma.socialMedia.createMany({
    data: [
      {
        storeId: store.id,
        platform: 'facebook',
        url: 'https://facebook.com/techstore',
        order: 1,
        isActive: true
      },
      {
        storeId: store.id,
        platform: 'instagram',
        url: 'https://instagram.com/techstore',
        order: 2,
        isActive: true
      },
      {
        storeId: store.id,
        platform: 'twitter',
        url: 'https://twitter.com/techstore',
        order: 3,
        isActive: true
      }
    ]
  });

  console.log(`🏪 Tienda creada: ${store.name}`);
  console.log(`⚙️ Configuración y redes sociales creadas`);
  return store;
}
