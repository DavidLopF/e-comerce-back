/**
 * Entidad Payment — mapeo del model `Payment` en Prisma
 * Campos en prisma: id, name, paymentMethod, description?, order, isActive, completed, createdAt, updatedAt
 */
export interface PaymentProps {
    id?: string;
    name: string;
    paymentMethod: string;
    description?: string | null;
    order?: number;
    isActive?: boolean;
    completed?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export class PaymentEntity {
    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly paymentMethod: string,
        public readonly description: string | null,
        public readonly order: number,
        public readonly isActive: boolean,
        public readonly completed: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    /**
     * Factory para crear una PaymentEntity con valores por defecto y validaciones mínimas.
     * Lanza Error si faltan campos obligatorios.
     */
    static create(props: PaymentProps): PaymentEntity {
        if (!props.name || !props.paymentMethod) {
            throw new Error('Payment requires name and paymentMethod');
        }

        const id = props.id ?? null;
        const description = props.description ?? null;
        const order = props.order ?? 0;
        const isActive = props.isActive ?? true;
        const completed = props.completed ?? false;
        const createdAt = props.createdAt ? new Date(props.createdAt) : new Date();
        const updatedAt = props.updatedAt ? new Date(props.updatedAt) : new Date();

        return new PaymentEntity(
            id,
            props.name,
            props.paymentMethod,
            description,
            order,
            isActive,
            completed,
            createdAt,
            updatedAt,
        );
    }

    /**
     * Convierte la entidad a un objeto plano apto para persistir con Prisma
     */
    toPrisma() {
        return {
            id: this.id ?? undefined,
            name: this.name,
            paymentMethod: this.paymentMethod,
            description: this.description,
            order: this.order,
            isActive: this.isActive,
            completed: this.completed,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        } as const;
    }

    /**
     * Construye una PaymentEntity a partir del objeto que devuelve Prisma.
     */
    static fromPrisma(prismaObj: any): PaymentEntity {
        if (!prismaObj) {
            throw new Error('Cannot create PaymentEntity from null/undefined');
        }

        return new PaymentEntity(
            prismaObj.id ?? null,
            prismaObj.name,
            prismaObj.paymentMethod,
            prismaObj.description ?? null,
            prismaObj.order ?? 0,
            prismaObj.isActive ?? true,
            prismaObj.completed ?? false,
            prismaObj.createdAt ? new Date(prismaObj.createdAt) : new Date(),
            prismaObj.updatedAt ? new Date(prismaObj.updatedAt) : new Date(),
        );
    }
}
