import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ 
        description: 'Email del usuario',
        example: 'usuario@ejemplo.com'
    })
    email: string;

    @ApiProperty({ 
        description: 'Nombre completo del usuario',
        example: 'Juan Pérez'
    })
    name: string;

    @ApiProperty({ 
        description: 'Dirección de entrega',
        example: 'Calle 123 #45-67, Bogotá'
    })
    deliveryAddress: string;

    @ApiProperty({ 
        description: 'Número de teléfono',
        example: '+57 300 123 4567'
    })
    phone: string;

    @ApiProperty({ 
        description: 'firebaseUid del usuario',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    firebaseUid: string;

    @ApiProperty({ 
        description: 'id de la tienda',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    storeId: string;
}
