import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from '../../../../domain/products/ports/product.repository';
import { Product } from '../../../../domain/products/entities/product.entity';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductsPrismaRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listActive(): Promise<Product[]> {
    const rows = await this.prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductMapper.toDomain);
  }

  async findBySlug(slug: string): Promise<Product | null> {
    const row = await this.prisma.product.findUnique({ where: { slug } });
    return row ? ProductMapper.toDomain(row) : null;
  }

  async create(entity: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: ProductMapper.toPrismaCreate(entity),
    });
    return ProductMapper.toDomain(created);
  }

  async update(entity: Product): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id: entity.id },
      data: ProductMapper.toPrismaUpdate(entity),
    });
    return ProductMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
