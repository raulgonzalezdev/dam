import axios, { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import React, { createContext, useContext, useState } from "react";
import { api } from "../services/axios";
import { useAuthStore } from "../stores/useAuthStore";

import useToast from "./useToast";

interface ApiContextData {
  loading: boolean;
  api: AxiosInstance;
}

const ApiContext = createContext<ApiContextData>({} as ApiContextData);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { logout, access } = useAuthStore(({ logout, access }) => ({
    logout,
    access,
  }));
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  api.interceptors.request.clear();
  api.interceptors.response.clear();

  api.interceptors.request.use(
    (request) => {
      if (request.headers && access) {
        request.headers.Authorization = `Bearer ${access}`;
      }

      setLoading(true);
      return request;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      setLoading(false);

      if (response.data.msg) {
        toast({
          title: response.data.msg.title,
          status: response.data.msg.type,
        });
      }

      return response;
    },

    async function (error) {
      setLoading(false);

      if (error.response?.status === 401 && access) {
        logout();

        toast({
          title: "",
          description: "Seu acesso expirou, entre novamente!",
          status: "warning",
        });
      } else if (error.response?.status === 401) {
        toast({
          title: "",
          description: "Usuário ou senha incorretos",
          status: "error",
        });
      } else if (error.response?.status === 403) {
        toast({
          title: "",
          description: "Usuário não tem permissão",
          status: "warning",
        });
      } else if (error.response?.status === 404) {
        toast({
          title: "",
          description: "Recurso não encontrado",
          status: "error",
        });
      } else {
        if (error.response?.data) {
          toast({
            title: "",
            description: "Preencha os dados corretamente",
            status: "error",
          });
        } else if (
          error.response?.data?.message &&
          typeof error.response.data.message === "string"
        ) {
          toast({
            title: "",
            description: error.response.data.message,
            status: "error",
          });
        } else if (
          error.response?.data?.message &&
          typeof error.response.data.message === "object"
        ) {
          toast({
            title: "",
            description: "Preencha os campos corretamente",
            status: "error",
          });
        } else {
          toast({
            title: "",
            description: "Erro interno, entre em contato com o suporte!",
            status: "error",
          });
        }

        return Promise.reject(error.response?.data);
      }
    }
  );

  return (
    <ApiContext.Provider value={{ loading, api }}>
      {children}
    </ApiContext.Provider>
  );
};

export function useApi(): ApiContextData {
  const context = useContext(ApiContext);
  return context;
}
