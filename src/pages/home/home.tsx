import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Empty, message, Space } from 'antd';
import { APP_URLS } from '../../routes/app.urls';
import { BookList } from '../../shared/components/books';
import { useFetch } from '../../shared/components/fetch-provider';
import { bookMock } from '../../mocks/books';

const Home = () => {
  const [books, setBooks] = useState([]);
  const { get } = useFetch();
  const history = useHistory();

  const handleCardClick = (id) => {
    history.push(APP_URLS.bookDetails.replace(':id', id));
  };

  const getData = useCallback(() => {
    get(
      `https://www.googleapis.com/books/v1/volumes?q=programming&key=${process.env.GOOGLE_BOOKS_KEY}`
    )
      .then((data: { items: [] }) => {
        setBooks(data.items);
      })
      .catch(() => {
        message.open({
          type: 'error',
          duration: 5,
          content:
            "no key, or smth...here's some mock data so that ur ain't sad.",
        });
        setBooks([bookMock]);
      });
  }, [get]);

  useEffect(() => {
    getData();
  }, [getData]);

  return books?.length > 0 ? (
    <Space>
      <BookList books={books} onCardClick={handleCardClick} />
    </Space>
  ) : (
    <Empty data-testid="empty" />
  );
};

export default Home;
