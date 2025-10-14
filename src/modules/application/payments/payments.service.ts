import { Injectable, Logger } from "@nestjs/common";
import { CreatePreferencesDto } from "../../presentation/http/dto/create-preferences.dto";
import { MercadoPagoService } from "./mercadopago.service";

@Injectable()
export class PaymentsService {
    private readonly logger = new Logger(PaymentsService.name);
    
    constructor(private readonly mercadopagoService: MercadoPagoService) {}

    public async createPreferences(body: CreatePreferencesDto){
        this.logger.log('🚀 Iniciando creación de preferencia de pago');
        
        try {
            const preferences = await this.mercadopagoService.createPreferences(body);
            this.logger.log('✅ Preferencia creada exitosamente:', preferences.id);
            return preferences;
        } catch (error) {
            this.logger.error('❌ Error al crear preferencia:', error.message);
            throw error;
        }
    }
}