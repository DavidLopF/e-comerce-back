import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../../domain/products/entities/product.entity';

export class ProductResponseDTO {
  @ApiProperty({
    description: 'ID único del producto',
    example: 'cm1234567890abcdef',
  })
  id!: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gaming Acer Nitro 5',
  })
  name!: string;

  @ApiProperty({
    description: 'Slug único del producto para URLs amigables',
    example: 'laptop-gaming-acer-nitro-5',
  })
  slug!: string;

  @ApiProperty({
    description: 'Precio en centavos',
    example: 2500000,
  })
  priceCents!: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/images/laptop.jpg',
    nullable: true,
  })
  imageUrl!: string | null;

  @ApiProperty({
    description: 'Estado del producto (activo/inactivo)',
    example: true,
  })
  active!: boolean;

  @ApiProperty({
    description: 'Descuento aplicado en porcentaje',
    example: 15,
  })
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
