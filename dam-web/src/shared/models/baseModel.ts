import { AxiosResponse } from "axios";
import { api } from "../../services/axios";
import { toURL } from "../utils/parse";

export class BaseModel {
  id!: number;
  created_at!: string;
  updated_at!: string;

  static type: string;

  async save(
    url?: number | string | Array<string | number> | null,
    params?: any
  ): Promise<BaseModel> {
    const type = Object.getPrototypeOf(this).constructor.type;
    let response: AxiosResponse;

    if (this.id) {
      response = await api.put(
        `/api/v1/${type}/${this.id}/${toURL(url)}`,
        this,
        {
          params,
        }
      );
    } else {
      response = await api.post(`/api/v1/${type}/${toURL(url)}`, this, {
        params,
      });
    }

    if (response) {
      Object.keys(response.data).forEach((key) => {
        // @ts-ignore
        this[key] = response.data[key];
      });
    }

    return response.data;
  }

  async destroy(
    url?: number | string | Array<string | number> | null,
    params?: any
  ): Promise<void> {
    const type = Object.getPrototypeOf(this).constructor.type;
    await api.delete(`/api/v1/${type}/${this.id}/${toURL(url)}`, {
      params,
    });
  }
}

export class Factory {
  static create<T>(type: new () => T): T {
    return new type();
  }
}
