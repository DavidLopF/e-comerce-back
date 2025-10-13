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
        description: 'ID de Firebase del usuario',
        example: 'kw1b0OkXY4VMwCNrJFNJ7pKAj3r1',
        required: false
    })
    firebaseUid?: string;

    @ApiProperty({ 
        description: 'ID de la tienda asociada al usuario',
        example: 'store123456',
        required: false
    })
    storeId?: string;
}
