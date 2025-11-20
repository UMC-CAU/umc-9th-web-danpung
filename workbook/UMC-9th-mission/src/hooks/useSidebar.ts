import { useState, useCallback, useEffect } from 'react';

export function useSidebar(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  useEffect(() => {
    const escKeyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', escKeyListener);
    return () => {
      window.removeEventListener('keydown', escKeyListener);
    };
  }, [close]);
  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}
