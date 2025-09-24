// src/infrastructure/persistence/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // Opcional: logging útil en dev
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
      errorFormat: 'pretty',
    });

    // --- Singleton seguro en dev (hot-reload) ---
    // Evita múltiples conexiones cuando Nest se recompila en watch mode.
    const g = global as any;
    if (!g.__PRISMA__) {
      g.__PRISMA__ = this;
    }
    return g.__PRISMA__;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
