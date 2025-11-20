import api from "./axiosInstance";
import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await api.post(`/v1/auth/signin`, { email, password });
  if (!response.data.status) throw new Error("로그인 실패");
  return response.data.data;
};
export const logout = async () => {
  const response = await api.post(`/v1/auth/signout`);
  if (!response.data.status) throw new Error("로그아웃 실패");
  return response.data.data;
};
export const deleteUser = async () => {
  const response = await api.delete(`/v1/users`);
  if (!response.data.status) throw new Error("회원탈퇴 실패");
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
