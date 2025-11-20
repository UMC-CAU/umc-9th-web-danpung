import { createContext, useContext, useState } from "react"; //토큰 여부

interface TokenContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
const TokenContext = createContext<TokenContextType | undefined>(undefined);
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
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
  return (
    <TokenContext.Provider value={{ token, login, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
