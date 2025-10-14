import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./modules/infrastructure/persistence/prisma/prisma.module";
import { AuthorizationModule } from "./modules/authorization/authorization.module";
import { ProductsController } from "./modules/presentation/http/controllers/product.controller";
import { CommonController } from "./modules/presentation/http/controllers/common.controller";
import { PaymentsController } from "./modules/presentation/http/controllers/payments.controller";
import { UserController } from "./modules/presentation/http/controllers/user.controller";
import { ProductService } from "./modules/application/products/product.service";
import { CommonService } from "./modules/application/common/common.services";
import { PaymentsService } from "./modules/application/payments/payments.service";
import { UserService } from "./modules/application/users/user.service";
import { MercadoPagoService } from "./modules/application/payments/mercadopago.service";
import { PRODUCT_REPOSITORY } from "./modules/domain/products/ports/product.repository";
import { COMMON_REPOSITORY } from "./modules/domain/products/ports/common.repository";
import { USER_REPOSITORY } from "./modules/domain/products/ports/user.repository";
import { ProductsPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/products.prisma.repository";
import { CommonPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/common.prisma.repository";
import { UserPrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/user.repository";
import { RolePrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/role.prisma.repository";
import { StorePrismaRepository } from "./modules/infrastructure/persistence/prisma/repositories/store.prisma.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthorizationModule
  ],
  controllers: [ProductsController, CommonController, PaymentsController, UserController],
  providers: [
    ProductService,
    CommonService,
    PaymentsService,
    UserService,
    MercadoPagoService,
    { provide: PRODUCT_REPOSITORY, useClass: ProductsPrismaRepository },
    { provide: COMMON_REPOSITORY, useClass: CommonPrismaRepository },
    { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
    { provide: 'ROLE_REPOSITORY', useClass: RolePrismaRepository },
    { provide: 'STORE_REPOSITORY', useClass: StorePrismaRepository }
  ],
})
export class AppModule {}
