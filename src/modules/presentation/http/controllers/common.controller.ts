import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from "@nestjs/swagger";
import { CommonService } from "src/modules/application/common/common.services";
import { StoreConfigResponseDto } from "../dto/store-config.response.dto";

@ApiTags('common')
@Controller('common')
export class CommonController {

    constructor(private readonly commonService: CommonService) {}

    @Get('store-config/:storeSlug')
    @ApiOperation({ summary: 'Obtener configuración de tienda por slug' })
    @ApiParam({ 
        name: 'storeSlug', 
        description: 'Slug único de la tienda',
        example: 'techstore-pro'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Configuración de tienda obtenida exitosamente',
        schema: {
            example: {
                success: true,
                data: {
                    store: {
                        name: 'TechStore Pro',
                        logo: {
                            url: 'https://example.com/logo.png',
                            alt: 'TechStore Pro Logo',
                            width: 200,
                            height: 60
                        },
                        contactEmail: 'contacto@techstore.com',
                        socialMedia: {
                            facebook: 'https://facebook.com/techstore',
                            instagram: 'https://instagram.com/techstore'
                        }
                    },
                    theme: {
                        colors: {
                            primary: '#007bff',
                            secondary: '#6c757d',
                            background: '#ffffff'
                        }
                    },
                    hero: {
                        enabled: true,
                        slides: []
                    }
                }
            }
        }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Tienda no encontrada' 
    })
    async getStoreConfig(@Param('storeSlug') storeSlug: string) {
        return this.commonService.getStoreConfig(storeSlug);
    }

    @Get('store-config')
    @ApiOperation({ summary: 'Obtener configuración de tienda por defecto' })
    @ApiQuery({ 
        name: 'store', 
        description: 'Slug de la tienda (opcional, por defecto: techstore-pro)',
        example: 'techstore-pro',
        required: false
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Configuración de tienda obtenida exitosamente',
        schema: {
            example: {
                success: true,
                data: {
                    store: {
                        name: 'TechStore Pro',
                        logo: {
                            url: 'https://example.com/logo.png',
                            alt: 'TechStore Pro Logo',
                            width: 200,
                            height: 60
                        },
                        contactEmail: 'contacto@techstore.com',
                        socialMedia: {
                            facebook: 'https://facebook.com/techstore',
                            instagram: 'https://instagram.com/techstore'
                        }
                    },
                    theme: {
                        colors: {
                            primary: '#007bff',
                            secondary: '#6c757d',
                            background: '#ffffff'
                        }
                    },
                    hero: {
                        enabled: true,
                        slides: []
                    }
                }
            }
        }
    })
    async getStoreConfigDefault(@Query('store') storeSlug?: string) {
        // Si no se proporciona slug, usar el slug por defecto
        const slug = storeSlug || 'techstore-pro';
        return this.commonService.getStoreConfig(slug);
    }
    
    @Get('hero-slides')
    @ApiOperation({ summary: 'Obtener slides del hero/banner' })
    @ApiResponse({ 
        status: 200, 
        description: 'Slides del hero obtenidos exitosamente',
        schema: {
            example: [
                {
                    id: 'slide-1',
                    title: 'Bienvenido a TechStore',
                    subtitle: 'Las mejores ofertas en tecnología',
                    description: 'Encuentra laptops, smartphones y más',
                    imageUrl: 'https://example.com/hero-banner.jpg',
                    imageUrlMobile: 'https://example.com/hero-banner-mobile.jpg',
                    cta: {
                        text: 'Ver productos',
                        link: '/products',
                        style: 'primary'
                    },
                    alignment: 'center',
                    backgroundColor: null,
                    textColor: null,
                    overlay: false,
                    overlayOpacity: 0.5,
                    order: 1
                }
            ]
        }
    })
    async getImages() {
        return this.commonService.getHeroSlides();
    }   

}
