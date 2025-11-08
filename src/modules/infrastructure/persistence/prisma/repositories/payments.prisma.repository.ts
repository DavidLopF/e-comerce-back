import { Injectable } from '@nestjs/common';
import { Payment } from 'mercadopago';
import { PaymentsRepository } from 'src/modules/domain/payments/ports/payments.repository';
import { RegisterPaymentDto } from 'src/modules/presentation/http/dto/register-payment.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentsPrismaRepository implements PaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerPayment(paymentData: RegisterPaymentDto): Promise<any> {

    const store = await this.prisma.store.findUnique({ where: { slug: paymentData.company_slug } });

  
    return await this.prisma.payment.create({
      data: {
        amount: paymentData.amount,
        reference: paymentData.reference,
        storeId: store?.id || '',
        userId: paymentData.user_id,
        paymentMethod: paymentData.paymentMethod || 'UNKNOWN',
        createdAt: new Date(),
      },
    });
  }
  
}
