import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ProductService } from "../../../application/products/product.service";
import { ProductResponseDTO } from "../dto/porduct.response.dto";

@ApiTags('products')
@Controller("products")
export class ProductsController {
  constructor(private readonly service: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los productos activos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de productos obtenida exitosamente',
    type: [ProductResponseDTO]
  })
  async list() {
    const products = await this.service.listAll();
    return products.map(ProductResponseDTO.fromDomain);
  }

  @Get(":slug")
  @ApiOperation({ summary: 'Obtener un producto por su slug' })
  @ApiParam({ 
    name: 'slug', 
    description: 'Slug único del producto',
    example: 'laptop-gaming-acer'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto encontrado exitosamente',
    type: ProductResponseDTO
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Producto no encontrado' 
  })
  async bySlug(@Param("slug") slug: string) {
    const p = await this.service.getBySlug(slug);
    return ProductResponseDTO.fromDomain(p);
  }
}
