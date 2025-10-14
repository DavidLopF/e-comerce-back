import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { AuthorizationService } from '../../modules/application/authorization/authorization.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verificar el token de Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);
      request['user'] = decodedToken;

      const userEmail = decodedToken.email;
      if (!userEmail) {
        throw new ForbiddenException('Email not found in token');
      }

      // Extraer storeId de los parámetros de la ruta o query si está disponible
      const storeId = request.params.storeId || request.query.storeId;

      // Verificar si el usuario es admin
      const isAuthorized = await this.authorizationService.isAuthorized(userEmail, storeId);
      
      if (!isAuthorized) {
        throw new ForbiddenException('Access denied. Admin privileges required');
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}