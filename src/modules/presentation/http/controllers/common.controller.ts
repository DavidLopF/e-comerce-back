import { Controller, Get } from "@nestjs/common";
import { CommonService } from "src/modules/application/common/common.services";

@Controller('common')
export class CommonController {

    constructor(private readonly commonService: CommonService) {}

    @Get('hero-slides')
    async getImages() {
        return this.commonService.getHeroSlides();
    }   

}
