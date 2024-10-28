export enum RoleEnum {
  Admin = 'admin',
  User = 'user',
}

export type User = {
  role: RoleEnum;
  name: string;
  email: string;
}
