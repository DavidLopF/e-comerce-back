import { Module } from "@nestjs/common";
import { PrismaModule } from "./modules/infrastructure/persistence/prisma/prisma.module";
import { ProductsController } from "./modules/presentation/http/controllers/product.controller";
import { CommonController } from "./modules/presentation/http/controllers/common.controller";
import { ProductService } from "./modules/application/products/services/product.service";
import { CommonService } from "./modules/application/common/common.services";
import { PRODUCT_REPOSITORY } from "./modules/domain/products/ports/product.repository";
import { COMMON_REPOSITORY } from "./modules/domain/products/ports/common.repository";
import { ProductsPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/products.prisma.repository";
import { CommonPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/common.prisma.repository";

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController, CommonController],
  providers: [
    ProductService,
    CommonService,
    { provide: PRODUCT_REPOSITORY, useClass: ProductsPrismaRepository },
    { provide: COMMON_REPOSITORY, useClass: CommonPrismaRepository },
  ],
})
export class AppModule {}
