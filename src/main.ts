// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './modules/infrastructure/persistence/prisma/prisma.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar logging global
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Configurar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:7008',
      'https://front-e-comerce-seven.vercel.app', 
      process.env.FRONTEND_URL // Variable de entorno para el frontend
    ].filter(Boolean), // Filtra valores undefined
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
  });

  // Configurar prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('API para sistema de e-commerce multi-tenant')
    .setVersion('1.0')
    .addTag('users', 'Gestión de usuarios')
    .addTag('products', 'Gestión de productos')
    .addTag('payments', 'Gestión de pagos')
    .addTag('common', 'Configuración común y tiendas')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'E-Commerce API Docs',
    customfavIcon: '/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const prisma = app.get(PrismaService);
  app.enableShutdownHooks(); 

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
