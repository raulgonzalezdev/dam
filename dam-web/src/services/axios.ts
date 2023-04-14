import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  api.post("/sso/v1/token/refresh").then((tokenRefreshResponse) => {
    localStorage.setItem("dan-session", tokenRefreshResponse.data.access);
    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + tokenRefreshResponse.data.access;
    return Promise.resolve();
  });

// Instantiate the interceptor
createAuthRefreshInterceptor(api, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
});
