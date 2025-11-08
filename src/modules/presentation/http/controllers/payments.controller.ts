import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { PaymentsService } from "src/modules/application/payments/payments.service";
import { CreatePreferencesDto } from "../dto/create-preferences.dto";
import { FirebaseAuthGuard } from "src/common/guards/firebase-auth.guard";
import { RegisterPaymentDto } from "../dto/register-payment.dto";

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-preferences')
  @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Crear preferencias de pago en MercadoPago' })
  @ApiBody({ type: CreatePreferencesDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Preferencias de pago creadas exitosamente',
    schema: {
      example: {
        id: '1234567890-abcdef12-3456-7890-abcdef123456',
        init_point: 'https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=1234567890-abcdef12-3456-7890-abcdef123456',
        sandbox_init_point: 'https://sandbox.mercadopago.com.co/checkout/v1/redirect?pref_id=1234567890-abcdef12-3456-7890-abcdef123456'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  async createPreferences(@Body() body: CreatePreferencesDto) {
    return this.paymentsService.createPreferences(body);
  }
    

 @Post('register-payment')
 @UseGuards(FirebaseAuthGuard)
  @ApiOperation({ summary: 'Registrar un pago realizado (Mock)' })
  @ApiResponse({
    status: 201,
    description: 'Pago registrado exitosamente',
    schema: {
      example: {
        message: 'Pago registrado exitosamente'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos'
  })
 async registerPayment(@Body() body: RegisterPaymentDto) {

    return this.paymentsService.registerPayment(body);
 }

 
}
