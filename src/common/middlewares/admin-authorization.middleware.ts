import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { AuthorizationService } from '../../modules/application/authorization/authorization.service';

interface AuthenticatedRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userEmail?: string;
  storeId?: string;
}

@Injectable()
export class AdminAuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly authorizationService: AuthorizationService) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    // Verificar que el usuario esté autenticado (debería haberse validado en un middleware anterior)
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verificar el token de Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      req.userEmail = decodedToken.email;

      if (!req.userEmail) {
        throw new ForbiddenException('Email not found in token');
      }

      // Extraer storeId de los parámetros de la ruta o query si está disponible
      const storeId = req.params.storeId || (req.query.storeId as string);
      req.storeId = storeId;

      // Verificar si el usuario es admin
      const isAuthorized = await this.authorizationService.isAuthorized(
        req.userEmail,
        storeId,
      );

      if (!isAuthorized) {
        throw new ForbiddenException(
          'Access denied. Admin privileges required',
        );
      }

      next();
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
