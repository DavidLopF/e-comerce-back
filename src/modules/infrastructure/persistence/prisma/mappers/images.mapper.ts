import { Prisma, Images as PrismaImages } from '@prisma/client';
import { Images } from '../../../../domain/products/entities/images.entity';


export const ImagesMapper = {
    toDomain(row: PrismaImages): Images {
        return Images.create({
            id: row.id,
            url: row.url,
            type: row.type,
        });
    }
}
