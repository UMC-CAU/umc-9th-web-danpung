import { createContext, useContext, useState } from "react"; //토큰 여부
import { useEffect } from "react";
import api from "../api/axiosInstance";
interface TokenContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  userMe: string | null;
}
const TokenContext = createContext<TokenContextType | undefined>(undefined);
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [userMe, setUserMe] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const login = (newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };
  useEffect(() => {
    if (token) {
      api.get("v1/users/me").then((res) => setUserMe(res.data.data.name));
    } else {
      setUserMe(null);
    }
  }, [token]);
  return (
    <TokenContext.Provider value={{ token, login, logout, userMe }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
