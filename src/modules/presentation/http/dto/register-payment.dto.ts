import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPaymentDto {
  @ApiProperty({
    description: 'referencia del pago realizado',
    example: '1234567890',
  })
  @IsString()
  reference: string;
  @ApiProperty({
    description: 'Slug de la empresa',
    example: 'mi-empresa',
  })
  @IsString()
  company_slug: string;
  @ApiProperty({
    description: 'ID del usuario',
    example: '123456',
  })
  @IsString()
  user_id: string;
  @ApiProperty({
    description: 'Monto del pago',
    example: 100.5,
  })
  @IsNumber()
  amount: number;
  @ApiProperty({
    description: 'Productos asociados al pago',
    type: [Object],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  products: Array<{
    id: string;
    quantity: number;
    unit_price: number;
  }>;
  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'credit_card',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentMethod?: string;
}
