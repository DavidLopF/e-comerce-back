import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from 'src/modules/application/users/user.service';
import { User } from 'src/modules/domain/users/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FirebaseAuthGuard } from 'src/common/guards/firebase-auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

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
        User.create(
          user.email,
          user.name,
          user.firebaseUid,
          true,
          user.phone,
          user.address,
        ),
        store,
      );
    } catch (error) {
      if (
        error.message.includes('Store with id') &&
        error.message.includes('not found')
      ) {
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

  @Get('/firebase/:id')
  @UseGuards(FirebaseAuthGuard)
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
    return this.userService.getUserByFirebaseUid(id);
  }

  @Get('permissions/:firebaeUid/:storeId')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Obtener permisos del usuario por Firebase UID' })
  @ApiParam({
    name: 'firebaeUid',
    description: 'Firebase UID del usuario',
    example: 'firebase-uid-123456',
  })
  @ApiParam({
    name: 'storeId',
    description: 'ID de la tienda',
    example: 'store-123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Permisos obtenidos exitosamente',
    schema: {
      example: {
        roles: ['admin-store', 'user-store', 'super-admin'],
        permissions: ['create-product', 'edit-product', 'delete-product'],
      },
    },
  })
  async getUserPermissions(
    @Param('firebaeUid') firebaeUid: string,
    @Param('storeId') storeId: string,
  ) {
    try {
      const user = await this.userService.getUserByFirebaseUid(firebaeUid);
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      const roles = await this.userService.getRoles(user.email, storeId);

      return {
        roles: roles 
      };
    } catch (error) {
      throw error;
    }
  }


  @Get('store/:storeId')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Obtener usuarios por tienda (Solo Admins)' })
  @ApiParam({
    name: 'storeId',
    description: 'ID de la tienda',
    example: 'cm1234567890abcdef',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios de la tienda',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado - Se requieren privilegios de administrador',
  })
  async getUsersByStoreId(@Param('storeId') storeId: string) {

  }
}
