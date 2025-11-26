export interface StoreConfigData {
  store: any;
  config: any;
  heroSlides: any[];
  socialMedia: any[];
}

export interface CommonRepository {
  getHeroSlides(): Promise<any[]>;
  getStoreConfig(storeSlug: string): Promise<StoreConfigData>;
}

export const COMMON_REPOSITORY = Symbol('COMMON_REPOSITORY');
