export interface UserRoleRepository {
  getRoleByName(name: string): Promise<string>;
}

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');
