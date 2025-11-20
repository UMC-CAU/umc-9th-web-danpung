import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRan.current >= interval) {
          setThrottledValue(value);
          console.log('throttled value updated:', value);
          lastRan.current = Date.now();
        }
      },
      interval - (Date.now() - lastRan.current)
    );

    return () => clearTimeout(handler);
  }, [value, interval]);

  return throttledValue;
}
