import { Injectable } from '@nestjs/common';
import { Payment } from 'mercadopago';
import { PaymentsRepository } from 'src/modules/domain/products/ports/payments.repository';

@Injectable()
export class PaymentsPrismaRepository implements PaymentsRepository {
  createPayments(): Promise<{
    name: string;
    id: string;
    paymentMethod: string;
    description: string | null;
    order: number;
    isActive: boolean;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }> {
    throw new Error('Method not implemented.');
  }
  getAllPaymentsByStore(storeId: string): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
  getActivePaymentsByStore(storeId: string): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
  getPaymentById(id: string): Promise<Payment | null> {
    throw new Error('Method not implemented.');
  }
}
