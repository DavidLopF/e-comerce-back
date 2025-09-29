# Semillas de Base de Datos

Esta carpeta contiene las semillas organizadas por entidad para poblar la base de datos con datos de ejemplo.

## Estructura

```
seeds/
├── index.ts          # Archivo principal que ejecuta todas las semillas
├── image.seed.ts     # Semillas para la tabla de imágenes
├── product.seed.ts   # Semillas para la tabla de productos
└── README.md         # Este archivo
```

## Uso

Para ejecutar todas las semillas:

```bash
npm run db:seed
```

## Agregar nuevas semillas

1. Crea un nuevo archivo `[entidad].seed.ts` en esta carpeta
2. Exporta una función `seed[Entidad]()` que retorne el número de registros creados
3. Importa y ejecuta la función en `index.ts`

### Ejemplo:

```typescript
// user.seed.ts
export async function seedUsers() {
  // Lógica de semillas
  return count;
}

// index.ts
import { seedUsers } from './user.seed';

// En la función main()
const userCount = await seedUsers();
```

## Orden de ejecución

Las semillas se ejecutan en el orden en que se llaman en `index.ts`. Asegúrate de respetar las dependencias entre entidades (ej: productos antes de imágenes si hay relaciones).
