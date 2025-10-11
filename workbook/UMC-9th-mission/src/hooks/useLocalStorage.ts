import { useState } from "react";
export function useLocalStorage(key: string) {
  const [storedValue, setStoredValue] = useState<string>(
    window.localStorage.getItem(key) || ""
  );

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  return [setValue];
}
