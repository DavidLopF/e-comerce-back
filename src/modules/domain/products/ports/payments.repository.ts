import { Payment } from "@prisma/client";

export interface PaymentsRepository {
    createPayments(): Promise<Payment>;
    getAllPaymentsByStore(storeId: string): Promise<any[]>;
    getActivePaymentsByStore(storeId: string): Promise<any[]>;
    getPaymentById(id: string): Promise<any>;

}