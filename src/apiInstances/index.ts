import axios, { AxiosInstance } from "axios";

export const userInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const issueInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/issues`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
