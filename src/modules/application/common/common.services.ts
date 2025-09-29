import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class CommonService {
  constructor(private readonly prisma: PrismaService) {}

  async getHeroSlides() {
    try {
      
    } catch (error) {
      throw new Error('Error al obtener las imágenes de la galería');
    }
  }
}
