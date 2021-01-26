import React from 'react';
import BookListItem from './book-list-item/book-list-item';
import styled from 'styled-components';
import { Book } from '../book';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
export interface BookListProps {
  books: Book[];
  onCardClick(id: string): void;
}

export function BookList(props: BookListProps) {
  return (
    <Container>
      {props.books?.map((item) => (
        <BookListItem
          key={item.id}
          book={item}
          onCardClick={props.onCardClick}
        />
      ))}
    </Container>
  );
}

export default BookList;
