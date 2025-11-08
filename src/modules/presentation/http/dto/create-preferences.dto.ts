import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {

  @ApiProperty({ 
    description: 'ID único del producto',
    example: 'cm1234567890abcdef'
  })
  @IsString()
  id: string;

  @ApiProperty({ 
    description: 'Título del producto',
    example: 'Laptop Gaming Acer Nitro 5'
  })
  @IsString()
  title: string;

  @ApiProperty({ 
    description: 'Descripción del producto',
    example: 'Laptop gaming con procesador Intel i7 y tarjeta gráfica RTX 3060'
  })
  @IsString()
  description: string;

  @ApiProperty({ 
    description: 'Cantidad del producto',
    example: 1,
    minimum: 1
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({ 
    description: 'Precio unitario en centavos',
    example: 2500000
  })
  @IsNumber()
  unit_price: number;

  @ApiProperty({ 
    description: 'URL de la imagen del producto',
    example: 'https://example.com/images/laptop.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  picture_url?: string;
}

export class PayerDto {
  @ApiProperty({ 
    description: 'Nombre del comprador',
    example: 'Juan Pérez'
  })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Email del comprador',
    example: 'juan.perez@ejemplo.com' 
  })
  @IsString()
  email: string;

  @ApiProperty({ 
    description: 'Teléfono del comprador',
    example: '+57 300 123 4567',
    required: false
  })
  @IsOptional()
  @IsString()
  phone?: {
    number: string;
  }

  @ApiProperty({ 
    description: 'Dirección del comprador',
    example: 'Calle Falsa 123',
    required: false
  })
  @IsOptional()
  @IsString()
  address?: {
    street_name: string;
  }
}

export class CreatePreferencesDto {
  @ApiProperty({ 
    description: 'Lista de items a incluir en la preferencia de pago',
    type: [ItemDto],
    example: [
      {
        id: 'cm1234567890abcdef',
        title: 'Laptop Gaming Acer Nitro 5',
        description: 'Laptop gaming con procesador Intel i7',
        quantity: 1,
        unit_price: 2500000,
        picture_url: 'https://example.com/images/laptop.jpg'
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @ApiProperty({ 
    description: 'URL para recibir notificaciones de webhook',
    example: 'https://tu-dominio.com/webhooks/mercadopago',
    required: false
  })
  @IsString()
  @IsOptional()
  notification_url?: string;

  @ApiProperty({ 
    description: 'Referencia externa para identificar la orden',
    example: 'ORDER-12345',
    required: false
  })
  @IsString()
  @IsOptional()
  external_reference?: string;

 
  @ApiProperty({ 
    description: 'Información del comprador',
    type: PayerDto,
    required: false,
    example: {
      name: 'Juan Pérez',
      email:  'juan.perez@ejemplo.com',
      phone: '+57 300 123 4567',
      address: 'Calle Falsa 123'
    }
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PayerDto)
  payer?: PayerDto; 
}
