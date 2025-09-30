import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedHeroSlides(storeId: string) {
  console.log('🎨 Creando slides del hero...');

  // Limpiar slides existentes
  await prisma.heroSlide.deleteMany();
  console.log('🧹 Slides existentes eliminados');

  // Crear slides de ejemplo
  const slides = await prisma.heroSlide.createMany({
    data: [
      {
        storeId,
        title: '¡Nuevos Auriculares Premium!',
        subtitle: 'Sonido de Alta Calidad',
        description: 'Descubre la mejor experiencia de audio con nuestros auriculares inalámbricos',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920',
        ctaText: 'Comprar Ahora',
        ctaLink: '/products/auriculares-inalambricos-premium',
        ctaStyle: 'primary',
        alignment: 'left',
        textColor: '#ffffff',
        overlay: true,
        overlayOpacity: 0.4,
        order: 1,
        isActive: true,
      },
      {
        storeId,
        title: 'Gaming de Última Generación',
        subtitle: 'Laptops Potentes',
        description: 'Equípate con la mejor tecnología para gaming profesional',
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920',
        ctaText: 'Ver Ofertas',
        ctaLink: '/products/laptop-gaming-ultra',
        ctaStyle: 'primary',
        secondaryCtaText: 'Explorar',
        secondaryCtaLink: '/products',
        secondaryCtaStyle: 'outline',
        alignment: 'center',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        overlay: true,
        overlayOpacity: 0.5,
        order: 2,
        isActive: true,
      },
      {
        storeId,
        title: 'Fotografía Profesional',
        subtitle: 'Captura cada momento',
        description: 'Cámaras 4K con la mejor tecnología del mercado',
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1920',
        ctaText: 'Descubrir',
        ctaLink: '/products/camara-digital-4k',
        ctaStyle: 'secondary',
        alignment: 'right',
        textColor: '#ffffff',
        overlay: true,
        overlayOpacity: 0.3,
        order: 3,
        isActive: true,
      }
    ]
  });

  console.log(`🎨 ${slides.count} slides del hero creados`);
  return slides.count;
}
