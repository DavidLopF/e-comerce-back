import { Images as PrismaImages } from '@prisma/client';

export class Images {
    constructor(
        public readonly id: string,
        public readonly url: string,
        public readonly type: string,
    ) {}

    static create(props: {
        id: string;
        url: string;
        type: string;
    }) {
        return new Images(props.id, props.url, props.type);
    }
}

export const ImagesMapper = {
    toDomain(row: PrismaImages): Images {
        return Images.create({
            id: row.id,
            url: row.url,
            type: row.type,
        });
    }
}