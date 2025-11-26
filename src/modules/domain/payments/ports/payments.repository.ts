import { Payment } from '@prisma/client';
import { RegisterPaymentDto } from 'src/modules/presentation/http/dto/register-payment.dto';

export interface PaymentsRepository {
  registerPayment(paymentData: RegisterPaymentDto): Promise<any>;
}

export const PAYMENT_REPOSITORY = Symbol('PAYMENT_REPOSITORY');
