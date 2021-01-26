import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { FetchContext } from './components/fetch-provider';

export const renderWithRouter = ({ apis, initialEntries }) =>
  render(
    <FetchContext.Provider value={{ ...apis }}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </FetchContext.Provider>
  );
