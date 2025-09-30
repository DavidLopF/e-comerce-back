# Seeds (Semillas) de Base de Datos

Este directorio contiene las semillas para poblar la base de datos con datos de ejemplo.

## Estructura

- `index.ts` - Archivo principal que ejecuta todas las semillas en orden
- `store.seed.ts` - Crea la tienda principal
- `category.seed.ts` - Crea las categorías de productos
- `product.seed.ts` - Crea productos de ejemplo
- `image.seed.ts` - Crea imágenes hero para la galería
- `hero-slides.seed.ts` - Crea los slides del banner principal

## Orden de Ejecución

Las semillas se ejecutan en el siguiente orden (importante para las relaciones):

1. **Store** - Se crea primero la tienda
2. **Categories** - Se crean las categorías
3. **Products** - Se crean los productos (requiere storeId y categoryId)
4. **Images** - Se crean las imágenes
5. **Hero Slides** - Se crean los slides del banner (requiere storeId)

## Uso

### Ejecutar todas las semillas

```bash
npm run seed
# o
npx tsx prisma/seeds/index.ts
```

### Después de cambios en el schema

```bash
# 1. Crear migración
npx prisma migrate dev --name tu_nombre_migracion

# 2. Ejecutar semillas
npm run seed
```

## Datos Creados

### Tienda
- **TechStore Demo** - Tienda principal de ejemplo

### Categorías (6)
- Electrónica
- Computadoras
- Audio
- Fotografía
- Deportes
- Accesorios

### Productos (10)
Productos de ejemplo en varias categorías con:
- Nombres descriptivos
- Precios realistas
- Imágenes de Unsplash
- Descuentos variados (0-20%)
- Descripciones detalladas

### Hero Slides (3)
- Slide de auriculares
- Slide de gaming
- Slide de fotografía

## Personalización

Puedes modificar los archivos individuales para:
- Agregar más productos
- Cambiar categorías
- Ajustar precios y descuentos
- Modificar la información de la tienda
- Personalizar los slides del hero

## Notas

- Las semillas eliminan datos existentes antes de crear nuevos
- Se requiere conexión a la base de datos
- Las imágenes usan URLs de Unsplash (requieren internet)
