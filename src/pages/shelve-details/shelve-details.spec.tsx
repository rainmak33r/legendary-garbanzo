import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../shared/testing-library.helper';
import { APP_URLS } from '../../routes/app.urls';
import { shelvesMock } from '../../mocks/shelves';
import { bookMock } from '../../mocks/books';
import { LS_SHELVES_KEY } from '../../shared/components/shelves';

test('should render empty if nothing is returned', async () => {
  const getMock = jest.fn().mockResolvedValue({});
  renderWithRouter({
    apis: { get: getMock },
    initialEntries: [
      APP_URLS.shelveDetails.replace(':name', shelvesMock[0].name),
    ],
  });
  expect(await screen.findByTestId('empty')).toBeVisible();
});

test('should show a error mesage on error', async () => {
  localStorage.setItem(LS_SHELVES_KEY, JSON.stringify([...shelvesMock]));
  const getMock = jest.fn().mockRejectedValue(null);
  renderWithRouter({
    apis: { get: getMock },
    initialEntries: [
      APP_URLS.shelveDetails.replace(':name', shelvesMock[0].name),
    ],
  });
  expect(getMock).toBeCalled();
  expect(await screen.findByText('No, cabron!!')).toBeVisible();
});

describe('ShelveDetails happy', () => {
  it('should render shelve with book details', async () => {
    const getMock = jest.fn().mockResolvedValue(bookMock);

    localStorage.setItem(
      LS_SHELVES_KEY,
      JSON.stringify([...shelvesMock, ...shelvesMock])
    );

    renderWithRouter({
      apis: { get: getMock },
      initialEntries: [
        APP_URLS.shelveDetails.replace(':name', shelvesMock[0].name),
      ],
    });
    expect(getMock).toBeCalled();
    expect(await screen.queryByTestId('empty')).not.toBeInTheDocument();
    expect(await screen.findByText(shelvesMock[0].name)).toBeVisible();
  });
});
