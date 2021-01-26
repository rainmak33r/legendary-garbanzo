import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Empty, message } from 'antd';
import { APP_URLS } from '../../routes/app.urls';
import { useLocalStorage } from '../../shared/hooks';
import { useFetch } from '../../shared/components/fetch-provider';
import {
  LS_SHELVES_KEY,
  Shelve,
  ShelveDetails as ShelveDetailsComponent,
} from '../../shared/components/shelves';
import { Book } from '../../shared/components/books';

const ShelveDetails = () => {
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const { get } = useFetch();
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const [shelve, setShelve] = useState<Shelve>();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const allShelves = getLocalStorageItem(LS_SHELVES_KEY);
    if (allShelves) {
      const found = allShelves.find((item) => item.name === name);
      setShelve(found);
    }
  }, [getLocalStorageItem, name]);

  useEffect(() => {
    if (shelve?.books?.length > 0) {
      const allCalls = shelve?.books
        .map((bookId) =>
          get(
            `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAmouyNrolppxaPxOxcWnwGbX0GmtwiUhQ`
          )
        )
        .map((promise) => promise.catch((e) => e));
      Promise.all(allCalls)
        .then((books: Book[]) => {
          if (
            books.some(
              (item) =>
                item instanceof Error ||
                Object.prototype.hasOwnProperty.call(item, 'error')
            )
          ) {
            throw new Error('one failed!');
          }
          setBooks(books);
        })
        .catch(() => {
          message.open({
            type: 'error',
            duration: 5,
            content: 'No, cabron!!',
          });
        });
    }
  }, [shelve, get]);

  useEffect(() => {
    if (shelve) {
      const allShelves = getLocalStorageItem(LS_SHELVES_KEY);
      const clone = allShelves.map((item) =>
        item.name === shelve.name ? { ...shelve } : item
      );
      setLocalStorageItem(LS_SHELVES_KEY, clone);
    }
  }, [getLocalStorageItem, setLocalStorageItem, shelve, shelve?.review]);

  const handleBookClick = (id) =>
    history.push(APP_URLS.bookDetails.replace(':id', id));

  const handleAddReview = (value) => {
    setShelve((prev) => ({ ...prev, review: value }));
  };

  const handleDeleteReview = () => {
    setShelve((prev) => ({ ...prev, review: null }));
  };

  return shelve ? (
    <ShelveDetailsComponent
      shelve={shelve}
      books={books}
      onBookClick={handleBookClick}
      onAddReview={handleAddReview}
      onDeleteReview={handleDeleteReview}
    />
  ) : (
    <Empty data-testid="empty" />
  );
};

export default ShelveDetails;
