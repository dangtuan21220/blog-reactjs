/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// import { refreshTokenApi } from './auth';

declare module "axios" {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean; // is true if you want to self handle access denied exception
  }
}

export const createService = (
  baseURL?: string,
  contentType: string = "application/json"
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};

const baseConfig = (
  baseURL?: string,
  contentType: string = "application/json"
) => {
  return {
    baseURL,
    headers: {
      Accept: "application/json, text/*, */*",
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  };
};

// eslint-disable-next-line prefer-const
let refreshSubscribers: any[] = [];

/**
 * Stores all pending request in array.
 *
 * @param {Function} cb
 */
const subscribeTokenRefresh = (cb: any) => {
  refreshSubscribers.push(cb);
};

/**
 * Sets token to all pending request stored in array.
 *
 * @param {String} token
 */
const onRefreshed = (token: any) => {
  refreshSubscribers.map((cb) => cb(token));
};

// hàm để refresh token
const refreshToken = async (instance: AxiosInstance) => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    if (window.location.pathname !== "/") {
      window.history.replaceState(null, "", "/");
    }
  }
  try {
    localStorage.removeItem("access_token");
    const { data } = await instance.post(`auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    localStorage.setItem("access_token", data.metadata.tokens.token);
    localStorage.setItem("refresh_token", data.metadata.tokens.refreshToken);
    onRefreshed(data.metadata.tokens.token);
  } catch (error) {
    window.history.pushState({}, "", "/");
  }
};

const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);

  instance.interceptors.request.use((cf) => {
    const token = localStorage.getItem("access_token");
    if (cf?.headers) {
      if (token) {
        cf.headers["Authorization"] = "Bearer " + token;
      }
    }
    cf.params = config.params || {};
    return cf;
  });
  instance.interceptors.response.use(
    (response: any) => {
      // Do something with response data;
      if (response.data.code === 401) {
        const pendingRequest = response.config;
        refreshToken(instance);
        const retryPendingRequest = new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            // replace the expired token and retry
            // pendingRequest.headers.authorization = `Bearer ${token}`;
            resolve(instance(pendingRequest));
          });
        });
        return retryPendingRequest;
      } else if (response.data.code === 403) {
        const pendingRequest = response.config;
        refreshToken(instance);
        const retryPendingRequest = new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            // replace the expired token and retry
            // pendingRequest.headers.authorization = `Bearer ${token}`;
            resolve(instance(pendingRequest));
          });
        });
        return retryPendingRequest;
      } else if (response.data.code === 501) {
        window.history.pushState({}, "", "/");
      }
      return response;
    },
    (error) => {
      console.log(error.message);
      if (error.response?.status === 401) {
        const pendingRequest = error.config;
        refreshToken(instance);
        const retryPendingRequest = new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            // replace the expired token and retry
            // pendingRequest.headers.authorization = `Bearer ${token}`;
            resolve(instance(pendingRequest));
          });
        });
        return retryPendingRequest;
      } else if (error.response.status === 501) {
        window.history.pushState({}, "", "/");
      } else {
      }
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};
