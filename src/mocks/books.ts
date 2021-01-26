import { Book } from '../shared/components/books';

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
    imageLinks: {
      smallThumbnail:
        'https://i.kym-cdn.com/entries/icons/facebook/000/013/564/doge.jpg',
      large:
        'https://i.kym-cdn.com/entries/icons/mobile/000/031/242/cover5.jpg',
    },
  },
};
