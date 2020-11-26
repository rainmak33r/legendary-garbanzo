import React, { useContext } from 'react';

export const FetchContext = React.createContext<{
  get?(url: string): Promise<any>;
}>({});
export const useFetch = () => useContext(FetchContext);
