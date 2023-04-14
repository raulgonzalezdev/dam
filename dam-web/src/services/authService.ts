import { api } from "./axios";
import { User } from "../shared/models/user";

type Response = {
  access: string;
  refresh: string;
};

export const login = async (
  values: Pick<User, "username" | "password">
): Promise<Response> => {
  const { data } = await api.post("/sso/v1/token/auth", values);
  return data;
};
