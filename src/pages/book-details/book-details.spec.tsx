import React from 'react';
import { screen } from '@testing-library/react';
import { APP_URLS } from '../../routes/app.urls';
import { bookMock } from '../../../mocks/books';
import { renderWithRouter } from '../../shared/testing-library.helper';

describe('BookDetails negative', () => {
  it('should render empty if nothing is returned', async () => {
    const getMock = jest.fn().mockResolvedValue(null);
    renderWithRouter({
      apis: { get: getMock },
      initialEntries: [APP_URLS.bookDetails.replace(':id', '1')],
    });
    expect(getMock).toBeCalled();
    expect(await screen.findByTestId('empty')).toBeVisible();
  });
  it('should show a error mesage on error', async () => {
    const getMock = jest.fn().mockRejectedValue(null);
    renderWithRouter({
      apis: { get: getMock },
      initialEntries: [APP_URLS.bookDetails.replace(':id', '1')],
    });
    expect(await screen.findByText('¿que?')).toBeVisible();
  });
});
describe('BookDetails happy', () => {
  beforeEach(() => {
    const getMock = jest.fn().mockResolvedValue(bookMock);
    renderWithRouter({
      apis: { get: getMock },
      initialEntries: [APP_URLS.bookDetails.replace(':id', '1')],
    });
  });
  it('should render book details', async () => {
    expect(screen.queryByTestId('empty')).not.toBeInTheDocument();
    expect(
      await screen.findByText(new RegExp(bookMock.volumeInfo.title, 'i'))
    ).toBeVisible();
  });
});
