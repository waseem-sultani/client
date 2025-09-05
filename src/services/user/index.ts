import { userInstance } from "../../apiInstances";
import { ISignup } from "../../utils/interfaces";

export const handleSignUp = async (data: ISignup) => {
  try {
    const response = await userInstance.post("/signup", data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await userInstance.post("/login", { email, password });

    if (response.status === 200 || response.status === 201)
      return response.data;

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await userInstance.get("/me");
    if (response.status === 200 || response.status === 201)
      return response.data?.user;
  } catch (error) {
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await userInstance.post("/logout");
    console.log(" Logged out");
  } catch (err) {
    console.error("Logout failed", err);
  }
};
