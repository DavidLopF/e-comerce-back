import { Module } from '@nestjs/common';
import { AuthorizationService } from '../application/authorization/authorization.service';
import { PrismaModule } from '../infrastructure/persistence/prisma/prisma.module';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AdminAuthorizationMiddleware } from '../../common/middlewares/admin-authorization.middleware';

@Module({
  imports: [PrismaModule],
  providers: [
    AuthorizationService,
    AdminGuard,
    AdminAuthorizationMiddleware,
  ],
  exports: [
    AuthorizationService,
    AdminGuard,
    AdminAuthorizationMiddleware,
  ],
})
export class AuthorizationModule {}