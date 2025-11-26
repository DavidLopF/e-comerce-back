export class Role {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(name: string, description: string): Role {
    const now = new Date();
    return new Role(
      '', // ID will be assigned by the database
      name,
      description,
      now,
      now,
    );
  }

  static fromPrisma(row: any): Role {
    return new Role(
      row.id,
      row.name,
      row.description,
      row.createdAt,
      row.updatedAt,
    );
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
