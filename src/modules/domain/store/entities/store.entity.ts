export class Store {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly address: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
  static create(name: string, address: string): Store {
    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    return new Store(id, name, address, createdAt, updatedAt);
  }
  static fromPrisma(row: any): Store {
    return new Store(
      row.id,
      row.name,
      row.address,
      row.createdAt,
      row.updatedAt,
    );
  }
  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
