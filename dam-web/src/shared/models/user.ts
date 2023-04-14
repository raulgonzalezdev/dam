import { BaseModel } from "./baseModel";

export class User extends BaseModel {
  static type = "users";

  first_name!: string;
  last_name!: string;
  avatar!: string;
  email!: string;
  username!: string;
  role!: string;
  password?: string;
}
