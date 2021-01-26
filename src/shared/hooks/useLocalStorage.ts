import { useCallback } from 'react';

export function useLocalStorage() {
  const setLocalStorageItem = useCallback((key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getLocalStorageItem = useCallback((key) => {
    const data = localStorage.getItem(key) || null;

    return JSON.parse(data);
  }, []);

  return { getLocalStorageItem, setLocalStorageItem };
}
