export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    email: string,
    name: string,
    deliveryAddress: string,
    phone: string,
    isActive: boolean = true,
  ): User {
    const now = new Date();
    return new User(
      '', // El ID se asignará desde la base de datos
      email,
      name,
      isActive,
      now,
      now,
    );
  }

  updateName(name: string): User {
    return new User(
      this.id,
      this.email,
      name,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  updateEmail(email: string): User {
    return new User(
      this.id,
      email,
      this.name,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  activate(): User {
    return new User(
      this.id,
      this.email,
      this.name,
      true,
      this.createdAt,
      new Date(),
    );
  }

  deactivate(): User {
    return new User(
      this.id,
      this.email,
      this.name,
      false,
      this.createdAt,
      new Date(),
    );
  }
}
