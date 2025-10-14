import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req['user'] = decodedToken;
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}