import { createService } from "./axios";

const API_BASE = import.meta.env.VITE_API_BASE as string;

const instance = createService(API_BASE);

export const login = async (params: any) => {
  const response = await instance.post(`auth/login`, params);
  return response;
};
