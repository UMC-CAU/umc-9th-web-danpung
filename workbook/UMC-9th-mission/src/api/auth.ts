import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/v1/auth/signin", {
      email,
      password,
    });
    return res.data;
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};

export const signUp = async (data: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
}) => {
  try {
    const res = await axiosInstance.post("/v1/auth/signup", data);
    return res.data;
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw err;
  }
};
