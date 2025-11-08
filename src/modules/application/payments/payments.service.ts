import { Injectable, Logger, Inject } from "@nestjs/common";
import { CreatePreferencesDto } from "../../presentation/http/dto/create-preferences.dto";
import { MercadoPagoService } from "./mercadopago.service";
import { USER_REPOSITORY } from "src/modules/domain/users/ports/user.repository";
import { User as DomainUser } from "src/modules/domain/users/entities/user.entity";
import { UserPrismaRepository } from "src/modules/infrastructure/persistence/prisma/repositories/user.repository";
import { RegisterPaymentDto } from "src/modules/presentation/http/dto/register-payment.dto";
import { PAYMENT_REPOSITORY } from "src/modules/domain/payments/ports/payments.repository";
import chalk from 'chalk';

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);
    constructor(
        private readonly mercadopagoService: MercadoPagoService,
        @Inject(USER_REPOSITORY) private readonly userRepository: UserPrismaRepository,
        @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: any,
    ) {}
    

    public async createPreferences(body: CreatePreferencesDto){
        this.logger.log(chalk.magenta('🚀 Iniciando creación de preferencia de pago'));
        try {

            if (body.payer) {
                const user = await this.userRepository.getUserByEmail(body.payer.email);
                if (!user) {
                    throw new Error('User not found');
                }
                
                let needsUpdate = false;
                let newAddress = user.address;
                let newPhone = user.phone;
                
                if (body.payer.address && !user.address) {
                    newAddress = body.payer.address.street_name;
                    needsUpdate = true;
                }
                if (body.payer.phone && !user.phone) {
                    newPhone = body.payer.phone.number;
                    needsUpdate = true;
                }
                
                if (needsUpdate) {
                    // Crear una nueva instancia de User con los datos actualizados
                    const userToUpdate = new DomainUser(
                        user.id,
                        user.email,
                        user.name,
                        user.isActive,
                        user.createdAt,
                        new Date(), // updatedAt
                        user.firebaseUid,
                        newPhone,
                        newAddress
                    );
                    
                    await this.userRepository.updateUser(userToUpdate);
                    this.logger.log(chalk.green('📦 Usuario actualizado con nueva información:') + '\n' + chalk.cyan(JSON.stringify({ phone: newPhone, address: newAddress }, null, 2)));
                } 
            }

            const preferences = await this.mercadopagoService.createPreferences(body);
            this.logger.log(chalk.green('✅ Preferencia creada exitosamente: ') + chalk.yellow(preferences.id));
            return preferences;
        } catch (error) {
            this.logger.error(chalk.red('❌ Error al crear preferencia: ') + chalk.redBright(error.message));
            throw error;
        }
    }

    public async  registerPayment(payment: RegisterPaymentDto){
        const result = await this.mercadopagoService.getPaymentStatus(payment.reference);

        if (result && (result as any).status === 'approved') {
      
            
            const paymentDB = await this.paymentRepository.registerPayment(payment);

            this.logger.log(`✅ Pago registrado en la base de datos: ${paymentDB.id}`);
            
            return { message: 'Pago registrado exitosamente', details: result };
        } else {
            this.logger.log(`⚠️ Pago no aprobado para la referencia: ${payment.reference} - Estado: ${(result as any)?.status || 'unknown'}`);
            return { message: 'El pago no fue aprobado', details: result };
        }

    }
        
}