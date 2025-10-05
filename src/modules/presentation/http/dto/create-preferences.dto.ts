import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDto {

  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unit_price: number;

  @IsOptional()
  @IsString()
  picture_url?: string;
}

export class CreatePreferencesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @IsString()
  @IsOptional()
  notification_url?: string;

  @IsString()
  @IsOptional()
  external_reference?: string;

  // Información del comprador (opcional)
  @IsString()
  @IsOptional()
  payer_name?: string;

  @IsString()
  @IsOptional()
  payer_email?: string;

  @IsString()
  @IsOptional()
  payer_document?: string;

  @IsString()
  @IsOptional()
  payer_phone?: string;
}
