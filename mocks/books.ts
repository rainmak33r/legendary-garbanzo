import { Book } from '../src/shared/components/books';

export const bookMock: Book = {
  id: '1',
  volumeInfo: {
    title: 'some-title',
    subtitle: 'some subtitle',
    authors: ['not me'],
    categories: ['Mathematics'],
    averageRating: 4,
    description: 'some description',
    ratingsCount: 100,
  },
};
