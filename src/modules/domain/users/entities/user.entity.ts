export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly firebaseUid?: string,
    public readonly phone?: string,
    public readonly address?: string,
  ) {}

  static create(
    email: string,
    name: string,
    firebaseUid?: string,
    isActive: boolean = true,
    phone?: string,
    address?: string,
  ): User {
    const now = new Date();
    return new User(
      '', // El ID se asignará desde la base de datos
      email,
      name,
      isActive,
      now,
      now,
      firebaseUid,
      phone,
      address,
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
      this.firebaseUid,
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
      this.firebaseUid,
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
      this.firebaseUid,
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
      this.firebaseUid,
    );
  }
}
