import React from 'react';
import { screen } from '@testing-library/react';
import Home from './home';
import { renderWithRouter } from '../../shared/testing-library.helper';
import { APP_URLS } from '../../routes/app.urls';

describe('Home', () => {
  it('should render, call fetch and render empty if no items are returned', async () => {
    const getMock = jest.fn().mockResolvedValue({ items: [] });
    renderWithRouter({
      apis: { get: getMock },
      initialEntries: [APP_URLS.home],
    });
    expect(getMock).toBeCalled();
    expect(await screen.findByTestId('empty')).toBeVisible();
  });
  it('should render book list', async () => {
    const getMock = jest.fn(
      () =>
        new Promise((resolve) =>
          resolve({ items: [{ id: '1', volumeInfo: { imageLinks: {} } }] })
        )
    );
    renderWithRouter({
      apis: { get: getMock },
      initialEntries: [APP_URLS.home],
    });
    expect(await screen.findByTestId('empty')).not.toBeInTheDocument();
    expect(await screen.findAllByTestId('book-list-item')).toHaveLength(1);
  });
});
