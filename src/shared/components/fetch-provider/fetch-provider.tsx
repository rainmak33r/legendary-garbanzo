import React, { ReactChild, useCallback } from 'react';
import { FetchContext } from './fetch-context';

export interface FetchProviderProps {
  children: ReactChild;
}
export function FetchProvider({ children }: FetchProviderProps) {
  const get = useCallback((url: string) => {
    return fetch(url).then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
  }, []);

  return (
    <FetchContext.Provider value={{ get }}>{children}</FetchContext.Provider>
  );
}
