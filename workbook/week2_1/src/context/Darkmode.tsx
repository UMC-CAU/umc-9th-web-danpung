import { createContext, useState, type ReactNode, useContext } from "react";

export interface Isdark {
  isdark: boolean;
  toggleDark: () => void;
}
export const DarkmodeCreate = createContext<Isdark | undefined>(undefined);

export const DarkmodeProvider = ({ children }: { children: ReactNode }) => {
  const [isdark, setIsdark] = useState(false);
  const toggleDark = () => setIsdark((prev) => !prev);

  return (
    <DarkmodeCreate.Provider value={{ isdark, toggleDark }}>
      {children}
    </DarkmodeCreate.Provider>
  );
};

export const useDark = () => {
  const context = useContext(DarkmodeCreate);
  if (!context) {
    throw new Error(
      "useDark는 반드시 DarkmodeProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
