import { Product } from '../entities/product.entity';

export interface ProductRepository {
  listActive(): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
  create(entity: Product): Promise<Product>;
  update(entity: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');
