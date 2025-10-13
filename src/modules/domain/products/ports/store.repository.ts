import { Store } from "../entities/store.entity";

export interface StoreRepository {

    getStoreById(id: string): Promise<Store | null>;
    getBySlug(slug: string): Promise<Store | null>;
    createStore(store: Store): Promise<Store>;
    updateStore(store: Store): Promise<Store>;
    deleteStore(id: string): Promise<void>;
    getAllStores(): Promise<Store[]>;
}

export const STORE_REPOSITORY = Symbol("STORE_REPOSITORY");