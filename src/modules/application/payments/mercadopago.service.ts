import { Injectable, Logger } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { CreatePreferencesDto } from '../../presentation/http/dto/create-preferences.dto';
import chalk from 'chalk';

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
    this.logger.log(
      chalk.cyan('🔄 Creando preferencia de pago con datos:') +
        '\n' +
        chalk.gray(JSON.stringify(data, null, 2)),
    );

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
        payer: data.payer
          ? {
              name: data.payer.name,
              email: data.payer.email,
              phone: data.payer.phone,
              address: data.payer.address,
            }
          : undefined,
        back_urls: {
          success:
            (process.env.FRONTEND_URL || 'https://localhost:3000') +
            '/pago/exito',
          failure:
            (process.env.FRONTEND_URL || 'https://localhost:3000') +
            '/pago/error',
          pending:
            (process.env.FRONTEND_URL || 'https://localhost:3000') +
            '/pago/pendiente',
        },
        auto_return: 'approved',
      };

      this.logger.log(
        chalk.blue('📤 Enviando datos a MercadoPago:') +
          '\n' +
          chalk.gray(JSON.stringify(preferenceData, null, 2)),
      );

      const response = await this.preference.create({ body: preferenceData });

      this.logger.log(
        chalk.green('✅ Respuesta de MercadoPago:') +
          '\n' +
          chalk.yellow(
            JSON.stringify(
              {
                id: response.id,
                init_point: response.init_point,
                sandbox_init_point: response.sandbox_init_point,
              },
              null,
              2,
            ),
          ),
      );

      return {
        id: response.id,
        init_point: response.init_point,
        sandbox_init_point: response.sandbox_init_point,
      };
    } catch (error) {
      this.logger.error(
        chalk.red('❌ Error detallado de MercadoPago:') +
          '\n' +
          chalk.redBright(
            JSON.stringify(
              {
                message: error.message,
                status: error.status,
                cause: error.cause,
                stack: error.stack,
              },
              null,
              2,
            ),
          ),
      );
      throw new Error(`Error al crear preferencia de pago: ${error.message}`);
    }
  }

  public async getPaymentStatus(id: string) {
    try {
      const response = await this.preference.get({ preferenceId: id });
      return response;
    } catch (error) {
      console.error('Error getting MercadoPago payment status:', error);
      throw new Error('Error al obtener el estado de pago');
    }
  }
}
