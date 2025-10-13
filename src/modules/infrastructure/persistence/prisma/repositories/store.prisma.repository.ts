import { Injectable } from "@nestjs/common";
import { Store } from "src/modules/domain/products/entities/store.entity";
import { StoreRepository } from "src/modules/domain/products/ports/store.repository";
import { PrismaService } from "src/modules/infrastructure/persistence/prisma/prisma.service";

@Injectable()
export class StorePrismaRepository implements StoreRepository {
    constructor(private readonly prisma: PrismaService) {}

    async getBySlug(slug: string): Promise<Store | null> {
        const store = await this.prisma.store.findUnique({ where: { slug } });
        return store ? this.toDomain(store) : null;
    }

    async getStoreById(id: string): Promise<Store | null> {
        const store = await this.prisma.store.findUnique({ where: { id } });
        return store ? this.toDomain(store) : null;
    }

    async getStoreBySlug(slug: string): Promise<Store | null> {
        const store = await this.prisma.store.findUnique({ where: { slug } });
        return store ? this.toDomain(store) : null;
    }

    async createStore(store: Store): Promise<Store> {
        const created = await this.prisma.store.create({
            data: {
                id: store.id,
                name: store.name,
                slug: store.name.toLowerCase().replace(/\s+/g, '-'),
                description: null,
                slogan: null,
                logo: null,
                favicon: null,
                email: null,
                phone: null,
                isActive: true,
            },
        });
        return this.toDomain(created);
    }

    async updateStore(store: Store): Promise<Store> {
        const updated = await this.prisma.store.update({
            where: { id: store.id },
            data: {
                name: store.name,
                slug: store.name.toLowerCase().replace(/\s+/g, '-'),
                // add other fields as needed
            },
        });
        return this.toDomain(updated);
    }

    async deleteStore(id: string): Promise<void> {
        await this.prisma.store.delete({ where: { id } });
    }

    async getAllStores(): Promise<Store[]> {
        const stores = await this.prisma.store.findMany();
        return stores.map((store) => this.toDomain(store));
    }

    private toDomain(prismaStore: any): Store {
        return new Store(
            prismaStore.id,
            prismaStore.name,
            prismaStore.description || '', // Usar description como address temporalmente
            prismaStore.createdAt,
            prismaStore.updatedAt
        );
    }
}