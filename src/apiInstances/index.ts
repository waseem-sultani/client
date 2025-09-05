import axios, { AxiosInstance } from "axios";

export const userInstance: AxiosInstance = axios.create({
  //   baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
  baseURL: "http://localhost:5000/user",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
