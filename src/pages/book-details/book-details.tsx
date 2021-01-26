import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Empty, message } from 'antd';
import { canAddBookToShelve } from './book-details.utils';
import { useLocalStorage } from '../../shared/hooks';
import { useFetch } from '../../shared/components/fetch-provider';
import {
  Book,
  BookDetails as BookDetailsComponent,
} from '../../shared/components/books';
import {
  LS_SHELVES_KEY,
  Shelve,
  AddBookToShelveMenu,
} from '../../shared/components/shelves';
import { bookMock } from '../../mocks/books';

export function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book>();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const { get } = useFetch();
  const [shelves, setShelves] = useState<Shelve[]>(
    getLocalStorageItem(LS_SHELVES_KEY) || []
  );

  const getData = useCallback(() => {
    get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_KEY}`
    )
      .then((book: Book) => {
        setBook({ ...book });
      })
      .catch(() => {
        message.open({
          type: 'error',
          duration: 5,
          content: 'still no key, huh? well what did you expect to happen?!',
        });
        setBook(bookMock);
      });
  }, [get, id]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (shelves.length > 0) {
      setLocalStorageItem(LS_SHELVES_KEY, shelves);
    }
  }, [setLocalStorageItem, shelves]);

  const handleAddToShelve = async (shelveName) => {
    const foundShelve = shelves.find((item) => item.name === shelveName);
    const validate = canAddBookToShelve(book, foundShelve);
    if (typeof validate !== 'string') {
      setShelves((prev) =>
        prev.map((shelve) =>
          shelve.name === shelveName
            ? {
                ...shelve,
                books: shelve.books ? [...shelve.books, book.id] : [],
              }
            : shelve
        )
      );
      message.open({
        type: 'success',
        duration: 5,
        content: 'Good show, sir!',
      });
    } else {
      message.open({
        type: 'error',
        duration: 5,
        content: validate,
      });
    }
  };

  return book ? (
    <BookDetailsComponent
      book={book}
      extraActions={
        shelves ? (
          <AddBookToShelveMenu
            shelves={shelves}
            onAddToShelve={handleAddToShelve}
          />
        ) : null
      }
    />
  ) : (
    <Empty data-testid="empty" />
  );
}

export default BookDetails;
