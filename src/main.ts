// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './modules/infrastructure/persistence/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:7008',
      'https://e-comerce-frontend.vercel.app', // Agrega tu dominio de frontend aquí
      'https://e-comerce-frontend.netlify.app', // O cualquier otro dominio de frontend
      process.env.FRONTEND_URL // Variable de entorno para el frontend
    ].filter(Boolean), // Filtra valores undefined
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
  });

  // Configurar prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  const prisma = app.get(PrismaService);
  app.enableShutdownHooks(); 

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
