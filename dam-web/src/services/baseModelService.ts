import { BaseModel, Factory } from "../shared/models/baseModel";
import { toURL } from "../shared/utils/parse";
import { api } from "./axios";
import {Pagination} from "../shared/interfaces/Pagenation";

export async function findBy<T extends BaseModel>(
  type: new () => T,
  url: number | string | Array<string | number>,
  params?: any
): Promise<T> {
  // @ts-ignore
  const response = await api.get<T>(`/api/v1/${type.type}/${toURL(url)}`, {
    params,
  });

  const instance = Factory.create(type);
  return Object.assign(instance, response);
}

export async function findMany<T extends BaseModel>(
  type: new () => T,
  url?: number | string | Array<string | number> | null,
  params?: any
): Promise<Pagination<T>> {
  const response = await api.get<Pagination<T>>(
    // @ts-ignore
    `/api/v1/${type.type}/${toURL(url)}`,
    {
      params,
    }
  );

  const results = response?.data.results?.map((item) => {
    const instance = Factory.create(type);
    return Object.assign(instance, item);
  });

  const meta = response?.data.meta;
  const links = response?.data.links;

  return { results, meta, links };
}

export async function request<T>(
  method: string = "GET",
  url?: number | string | Array<string | number> | null,
  params?: any,
  data?: any
): Promise<T> {
  const response = await api<T>({
    method,
    url: `/api/v1/${url}`,
    params,
    data,
  });

  return response?.data as T;
}
