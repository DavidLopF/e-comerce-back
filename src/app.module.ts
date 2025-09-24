import { Module } from "@nestjs/common";
import { PrismaModule } from "./modules/infrastructure/persistence/prisma/prisma.module";
import { ProductsController } from "./modules/presentation/http/controllers/product.controller";
import { ProductService } from "./modules/application/products/services/product.service";
import { PRODUCT_REPOSITORY } from "./modules/domain/products/ports/product.repository";
import { ProductsPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/products.prisma.repository";

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    ProductService,
    { provide: PRODUCT_REPOSITORY, useClass: ProductsPrismaRepository },
  ],
})
export class AppModule {}
