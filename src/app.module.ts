import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./modules/infrastructure/persistence/prisma/prisma.module";
import { ProductsController } from "./modules/presentation/http/controllers/product.controller";
import { CommonController } from "./modules/presentation/http/controllers/common.controller";
import { PaymentsController } from "./modules/presentation/http/controllers/payments.controller";
import { ProductService } from "./modules/application/products/product.service";
import { CommonService } from "./modules/application/common/common.services";
import { PaymentsService } from "./modules/application/payments/payments.service";
import { MercadoPagoService } from "./modules/application/payments/mercadopago.service";
import { PRODUCT_REPOSITORY } from "./modules/domain/products/ports/product.repository";
import { COMMON_REPOSITORY } from "./modules/domain/products/ports/common.repository";
import { ProductsPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/products.prisma.repository";
import { CommonPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/common.prisma.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule
  ],
  controllers: [ProductsController, CommonController, PaymentsController],
  providers: [
    ProductService,
    CommonService,
    PaymentsService,
    MercadoPagoService,
    { provide: PRODUCT_REPOSITORY, useClass: ProductsPrismaRepository },
    { provide: COMMON_REPOSITORY, useClass: CommonPrismaRepository },
  ],
})
export class AppModule {}
