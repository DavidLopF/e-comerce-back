import { Injectable, Logger } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CreatePreferencesDto } from '../../presentation/http/dto/create-preferences.dto';

@Injectable()
export class MercadoPagoService {
  private readonly logger = new Logger(MercadoPagoService.name);
  private client: MercadoPagoConfig;
  private preference: Preference;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
      options: {
        timeout: 5000,
      },
    });
    this.preference = new Preference(this.client);
  }

  async createPreferences(data: CreatePreferencesDto) {
    this.logger.log('🔄 Creando preferencia de pago con datos:', JSON.stringify(data, null, 2));
    
    try {
      const preferenceData = {
        items: data.items.map((item, index) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          picture_url: item.picture_url,
        })),
        notification_url: data.notification_url,
        external_reference: data.external_reference,
        currency_id: 'COP', // Moneda colombiana
        // Información del comprador (opcional)
        payer: data.payer_name || data.payer_email || data.payer_document || data.payer_phone ? {
          name: data.payer_name,
          email: data.payer_email,
          identification: data.payer_document ? {
            type: 'CC', // Cédula de Ciudadanía
            number: data.payer_document,
          } : undefined,
          phone: data.payer_phone ? {
            number: data.payer_phone,
          } : undefined,
        } : undefined,
        back_urls: {
          success: (process.env.FRONTEND_URL || 'https://localhost:3000') + '/pago/exito',
          failure: (process.env.FRONTEND_URL || 'https://localhost:3000') + '/pago/error',
          pending: (process.env.FRONTEND_URL || 'https://localhost:3000') + '/pago/pendiente',
        },
        auto_return: 'approved',
      };

      this.logger.log('📤 Enviando datos a MercadoPago:', JSON.stringify(preferenceData, null, 2));
      
      const response = await this.preference.create({ body: preferenceData });
      
      this.logger.log('✅ Respuesta de MercadoPago:', JSON.stringify({
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
      }, null, 2));
      
      return {
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
      };
    } catch (error) {
      this.logger.error('❌ Error detallado de MercadoPago:', {
        message: error.message,
        status: error.status,
        cause: error.cause,
        stack: error.stack
      });
      throw new Error(`Error al crear preferencia de pago: ${error.message}`);
    }
  }

  public async getPaymentStatus(id: string){
    try {
      const response = await this.preference.get({ preferenceId: id });
      return response;
    } catch (error) {
      console.error('Error getting MercadoPago payment status:', error);
      throw new Error('Error al obtener el estado de pago');
    }
  }
}
