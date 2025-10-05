import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PaymentsService } from "src/modules/application/payments/payments.service";
import { CreatePreferencesDto } from "../dto/create-preferences.dto";

@Controller('payments')
export class PaymentsController {

  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-preferences')
  async createPreferences(@Body() body: CreatePreferencesDto) {
    return this.paymentsService.createPreferences(body);
  }
    

  // @Get('preferences/:id/status')
  // async getPreferenceStatus(@Param('id') id: string) {
  //   return this.paymentsService.getPaymentStatus(id);  }
}
