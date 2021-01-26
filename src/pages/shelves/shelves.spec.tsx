import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shelvesMock } from '../../mocks/shelves';
import { renderWithRouter } from '../../shared/testing-library.helper';
import { APP_URLS } from '../../routes/app.urls';
import { LS_SHELVES_KEY } from '../../shared/components/shelves';

describe('Shelve List', () => {
  beforeEach(() => {
    localStorage.setItem(
      LS_SHELVES_KEY,
      JSON.stringify([...shelvesMock, ...shelvesMock])
    );
    renderWithRouter({
      apis: {},
      initialEntries: [APP_URLS.shelves],
    });
  });
  it('should have an add button', async () => {
    expect(await screen.findByTestId('add-shelve-button')).toBeVisible();
  });
  it('should render book list', async () => {
    expect(await screen.findAllByTestId('shelve-list-item')).toHaveLength(2);
  });
  it('should open modal on add button click', async () => {
    userEvent.click(await screen.findByTestId('add-shelve-button'));
    expect(await screen.findByText('Add shelve')).toBeVisible();
  });
});
