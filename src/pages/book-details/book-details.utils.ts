import { Book } from '../../shared/components/books';
import { Shelve } from '../../shared/components/shelves';

export const canAddBookToShelve = (book: Book, shelve: Shelve) => {
  if (shelve.books?.includes(book.id)) {
    return 'The book already exists on this shelve!';
  }
  if (
    !book.volumeInfo.categories
      .map((item) => item.toLowerCase())
      .some((item) => item.includes(shelve.category.toLowerCase()))
  ) {
    return "This shelve doesn't support any of these categories, sorry";
  }
  return null;
};
