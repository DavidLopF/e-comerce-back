import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "../../../application/products/services/product.service";
import { ProductResponseDTO } from "../dto/porduct.response.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async list() {
    const products = await this.service.listAll();
    return products.map(ProductResponseDTO.fromDomain);
  }

  @Get(":slug")
  async bySlug(@Param("slug") slug: string) {
    const p = await this.service.getBySlug(slug);
    return ProductResponseDTO.fromDomain(p);
  }
}
