import { Controller, Get, Param, Query } from "@nestjs/common";
import { CommonService } from "src/modules/application/common/common.services";

@Controller('common')
export class CommonController {

    constructor(private readonly commonService: CommonService) {}


    @Get('store-config/:storeSlug')
    async getStoreConfig(@Param('storeSlug') storeSlug: string) {
        return this.commonService.getStoreConfig(storeSlug);
    }

    @Get('store-config')
    async getStoreConfigDefault(@Query('store') storeSlug?: string) {
        // Si no se proporciona slug, usar el slug por defecto
        const slug = storeSlug || 'techstore-pro';
        return this.commonService.getStoreConfig(slug);
    }
    

    @Get('hero-slides')
    async getImages() {
        return this.commonService.getHeroSlides();
    }   

}
