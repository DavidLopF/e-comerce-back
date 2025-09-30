import { PrismaService } from "../prisma.service";
import { Images, ImagesMapper } from "../../../../domain/products/entities/images.entity";
import type { StoreConfigData, CommonRepository } from "../../../../domain/products/ports/common.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class  CommonPrismaRepository implements CommonRepository {

    constructor(private readonly prisma: PrismaService) {}

    public async getHeroSlides(): Promise<Images[]> {
        try {
        const slides = await this.prisma.images.findMany({
            where: {
                type: 'hero'
            }
        });
        return slides.map(ImagesMapper.toDomain);
    } catch (error) {
        throw new Error('Error al obtener las imágenes de la galería');
    }

    }

    public async getStoreConfig(storeSlug: string): Promise<StoreConfigData> {
        try {
             console.log('store', storeSlug);
            const store = await this.prisma.store.findUnique({
                where: {
                    slug: storeSlug,
                    isActive: true
                }
            });

        
            if (!store) {
                throw new Error('No se encontró una tienda activa');
            }

            // Obtener la configuración de la tienda (puede ser null)
            const config = await this.prisma.storeConfig.findFirst({
                where: {
                    storeId: store.id
                }
            });

            // Obtener los slides del hero
            const heroSlides = await this.prisma.heroSlide.findMany({
                where: {
                    storeId: store.id,
                    isActive: true
                },
                orderBy: {
                    order: 'asc'
                }
            });

            // Obtener redes sociales
            const socialMedia = await this.prisma.socialMedia.findMany({
                where: {
                    storeId: store.id,
                    isActive: true
                },
                orderBy: {
                    order: 'asc'
                }
            });

            return {
                store,
                config: config || null,
                heroSlides,
                socialMedia
            };
        } catch (error) {
            console.error('Error en CommonRepository.getStoreConfig:', error);
            throw new Error(`Error al obtener la configuración de la tienda: ${error.message}`);
        }
    }
}





