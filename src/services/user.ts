import { createService } from "./axios";

const API_BASE = import.meta.env.VITE_API_BASE as string;

const instance = createService(API_BASE);

export const getAllUser = async (query: any) => {
  const response = await instance.get(`/users?${query}`);
  return response;
};
