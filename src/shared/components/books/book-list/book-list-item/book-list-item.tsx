import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { Book } from '../../book';
import { StyledCard } from '../../../index';

export interface BookListItemProps {
  book: Book;
  onCardClick(id: string): void;
}

const CardStyled = styled(StyledCard)`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  flex: 1 0 15%;
`;

export function BookListItem(props: BookListItemProps) {
  const { id, volumeInfo } = props.book;
  const { imageLinks, title, authors } = volumeInfo;
  const handleClick = () => {
    props.onCardClick(id);
  };

  return (
    <CardStyled
      data-testid="book-list-item"
      hoverable
      onClick={handleClick}
      cover={<img alt="book-cover" src={imageLinks?.thumbnail} />}
    >
      <Card.Meta title={title} description={authors?.join(', ')} />
    </CardStyled>
  );
}

export default BookListItem;
