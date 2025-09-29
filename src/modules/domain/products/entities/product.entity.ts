export class Product {
    private constructor(
      public readonly id: string,
      public name: string,
      public slug: string,
      public priceCents: number,
      public imageUrl: string | null = null,
      public active: boolean = true,
      public discount: number = 0,
      public readonly tenantId?: string, // quítalo si no usas tenancy
    ) {}
  
    static create(props: {
      id: string; name: string; slug: string; priceCents: number;
      imageUrl?: string | null; active?: boolean; discount?: number; tenantId?: string;
    }) {
      if (!props.name?.trim()) throw new Error("Nombre requerido");
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(props.slug)) throw new Error("Slug inválido");
      if (!Number.isInteger(props.priceCents) || props.priceCents < 0) throw new Error("Precio inválido");
  
      return new Product(
        props.id,
        props.name.trim(),
        props.slug,
        props.priceCents,
        props.imageUrl ?? null,
        props.active ?? true,
        props.discount ?? 0,
        props.tenantId,
      );
    }
  
    changePrice(newPriceCents: number) {
      if (!Number.isInteger(newPriceCents) || newPriceCents < 0) throw new Error("Precio inválido");
      this.priceCents = newPriceCents;
    }
    rename(newName: string) {
      if (!newName?.trim()) throw new Error("Nombre requerido");
      this.name = newName.trim();
    }
    activate() { this.active = true; }
    deactivate() { this.active = false; }
  
    toPrimitives() {
      return {
        id: this.id, name: this.name, slug: this.slug,
        priceCents: this.priceCents, imageUrl: this.imageUrl,
        active: this.active, discount: this.discount, tenantId: this.tenantId,
      };
    }
  }
  