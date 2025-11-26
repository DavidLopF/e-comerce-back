import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/infrastructure/persistence/prisma/prisma.service';
import { COMMON_REPOSITORY } from 'src/modules/domain/store/ports/common.repository';
import type { CommonRepository } from 'src/modules/domain/store/ports/common.repository';
import type { StoreConfigResponseDto } from 'src/modules/presentation/http/dto/store-config.response.dto';

@Injectable()
export class CommonService {
  constructor(
    @Inject(COMMON_REPOSITORY) private readonly repo: CommonRepository,
  ) {}

  async getHeroSlides() {
    try {
      return this.repo.getHeroSlides();
    } catch (error) {
      throw new Error('Error al obtener las imágenes de la galería');
    }
  }

  async getStoreConfig(storeSlug: string): Promise<StoreConfigResponseDto> {
    try {
      const data = await this.repo.getStoreConfig(storeSlug);

      // Transformar las redes sociales a un objeto
      const socialMedia: { [key: string]: string } = {};
      data.socialMedia.forEach((sm) => {
        socialMedia[sm.platform] = sm.url;
      });

      // Obtener colores del tema o usar valores por defecto
      const themeColors = data.config?.theme?.colors || {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#ffffff',
      };

      // Transformar los slides del hero
      const slides = data.heroSlides.map((slide) => ({
        id: slide.id,
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        imageUrl: slide.imageUrl,
        imageUrlMobile: slide.imageUrlMobile,
        cta: {
          text: slide.ctaText,
          link: slide.ctaLink,
          style: slide.ctaStyle,
        },
        secondaryCta: slide.secondaryCtaText
          ? {
              text: slide.secondaryCtaText,
              link: slide.secondaryCtaLink,
              style: slide.secondaryCtaStyle,
            }
          : undefined,
        alignment: slide.alignment,
        backgroundColor: slide.backgroundColor,
        textColor: slide.textColor,
        overlay: slide.overlay,
        overlayOpacity: slide.overlayOpacity,
        order: slide.order,
      }));

      return {
        success: true,
        data: {
          store: {
            name: data.store.name,
            logo: {
              url: data.store.logo,
              alt: `Logo de ${data.store.name}`,
              width: 180,
              height: 50,
            },
            contactEmail: data.store.email,
            socialMedia,
          },
          theme: {
            colors: themeColors,
          },
          hero: {
            enabled: slides.length > 0,
            slides,
          },
        },
      };
    } catch (error) {
      console.error('Error en getStoreConfig:', error);
      throw new Error('Error al obtener la configuración de la tienda');
    }
  }
}
