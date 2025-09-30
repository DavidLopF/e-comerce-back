import { Images } from "../entities/images.entity";

export interface StoreConfigData {
    store: any;
    config: any;
    heroSlides: any[];
    socialMedia: any[];
}

export interface CommonRepository {
    getHeroSlides(): Promise<Images[]>;
    getStoreConfig(storeSlug: string): Promise<StoreConfigData>;
}

export const COMMON_REPOSITORY = Symbol("COMMON_REPOSITORY");
