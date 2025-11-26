import { Prisma, Product as PrismaProduct } from '@prisma/client';
import { Product } from '../../../../domain/products/entities/product.entity';

export const ProductMapper = {
  toDomain(row: PrismaProduct): Product {
    return Product.create({
      id: row.id,
      name: row.name,
      slug: row.slug,
      priceCents: row.priceCents,
      imageUrl: row.imageUrl ?? null,
      active: row.active,
      discount: row.discount ?? 0,
      tenantId: (row as any).tenantId,
    });
  },

  toPrismaCreate(
    entity: Product,
    storeId: string,
  ): Prisma.ProductUncheckedCreateInput {
    const p = entity.toPrimitives();
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      priceCents: p.priceCents,
      imageUrl: p.imageUrl,
      active: p.active,
      discount: p.discount || 0,
      storeId: storeId,
      // categoryId se puede agregar después si es necesario
    };
  },

  toPrismaUpdate(entity: Product): Prisma.ProductUncheckedUpdateInput {
    const p = entity.toPrimitives();
    return {
      name: p.name,
      slug: p.slug,
      priceCents: p.priceCents,
      imageUrl: p.imageUrl,
      active: p.active,
      // tenantId: p.tenantId, // si aplica
    };
  },
};
