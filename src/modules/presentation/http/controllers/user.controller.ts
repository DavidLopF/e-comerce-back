import { Body, Controller, Get, Param, Post, Query, ConflictException, NotFoundException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from 'src/modules/application/users/user.service';
import { User } from 'src/modules/domain/products/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario ya existe con este email',
  })
  async createUser(@Body() user: CreateUserDto) {
    try {
      const store = user.storeId || null;
      return await this.userService.createUser(
        User.create(user.email, user.name, user.firebaseUid),
        store,
      );
    } catch (error) {
      if (error.message.includes('Store with id') && error.message.includes('not found')) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  
  @Get('validate-profile-complete')
  @ApiOperation({ summary: 'Validar si el perfil del usuario está completo' })
  async validateProfileComplete(@Query('email') email: string) {
    const result = await this.userService.validateProfileComplete(email);
    return {
      isComplete: result.isComplete,
      user: result.user,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID único del usuario',
    example: 'cm1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado exitosamente',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id) || null;
  }

}
