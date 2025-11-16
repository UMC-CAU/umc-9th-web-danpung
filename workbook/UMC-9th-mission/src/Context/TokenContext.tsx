import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { IUserMe } from "../types/LP";
import api from "../api/axiosInstance";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  userMe: IUserMe | null;
  setUserMe: (user: IUserMe | null) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [userMe, setUserMe] = useState<IUserMe | null>(null);
  const isLoggingOut = useRef(false);

  const login = (newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    isLoggingOut.current = true;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setUserMe(null);
  };

  useEffect(() => {
    if (token) {
      api
        .get("/v1/users/me")
        .then((res) => {
          if (!isLoggingOut.current) setUserMe(res.data.data);
        })
        .catch(() => setUserMe(null));
    } else {
      setUserMe(null);
    }
  }, [token]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, login, logout, userMe, setUserMe }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used within a TokenProvider");
  return context;
};
