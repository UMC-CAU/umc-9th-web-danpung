import { useState } from 'react'; //로컬스토리지에 토큰 저장
export function useLocalStorage(key: string) {
  const [_storedValue, setStoredValue] = useState<string>(
    window.localStorage.getItem(key) || ''
  );

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  return [setValue];
}
