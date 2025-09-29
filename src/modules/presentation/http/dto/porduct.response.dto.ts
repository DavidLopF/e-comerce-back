import { Product } from "../../../domain/products/entities/product.entity";

export class ProductResponseDTO {
  id!: string;
  name!: string;
  slug!: string;
  priceCents!: number;
  imageUrl!: string | null;
  active!: boolean;
  discount!: number;

  static fromDomain(p: Product): ProductResponseDTO {
    const dto = new ProductResponseDTO();
    dto.id = p.id;
    dto.name = p.name;
    dto.slug = p.slug;
    dto.priceCents = p.priceCents;
    dto.imageUrl = p.imageUrl ?? null;
    dto.active = p.active;
    dto.discount = p.discount;
    return dto;
  }
}
