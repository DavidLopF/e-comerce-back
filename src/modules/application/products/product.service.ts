import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "../../domain/products/ports/product.repository";
import type { ProductRepository } from "../../domain/products/ports/product.repository";
import { Product } from "../../domain/products/entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly repo: ProductRepository,
  ) {}

  listAll(): Promise<Product[]> {
    return this.repo.listActive();
  }

  async getBySlug(slug: string): Promise<Product> {
    const p = await this.repo.findBySlug(slug);
    if (!p) throw new NotFoundException("Producto no encontrado");
    return p;
  }

  // Ejemplos si luego agregas comandos
  // async create(dto: CreateProductDto): Promise<Product> { ... }
  // async update(id: string, dto: UpdateProductDto): Promise<Product> { ... }
}
