import React from 'react';
import { Col, Descriptions, Image, Rate, Row } from 'antd';
import { Book } from '../book';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import { StyledPageHeader } from '../../index';

export interface BookDetailsProps {
  book: Book;
  extraActions: React.ReactChild;
}

const Span = styled('span')`
  :not(:last-child):after {
    content: ', ';
    display: inline-block;
  }'
`;
export function BookDetails(props: BookDetailsProps) {
  const { book, extraActions } = props;

  return (
    <StyledPageHeader
      ghost={false}
      onBack={() => window.history.back()}
      title={book?.volumeInfo?.title}
      subTitle={book?.volumeInfo?.subtitle}
      extra={[extraActions]}
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Categories">
          {book?.volumeInfo?.categories?.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label="Authors">
          {book?.volumeInfo?.authors?.map((auth) => (
            <Span key={auth}>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://www.google.com/search?q=${auth
                  .split(' ')
                  .join('+')}`}
              >
                {auth}
              </a>
            </Span>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <Row gutter={16}>
        <Col span={12}>
          <Row gutter={8}>
            <div>{ReactHtmlParser(book?.volumeInfo?.description)}</div>
          </Row>
          <div>
            <Rate allowHalf disabled value={book?.volumeInfo?.averageRating} />
            <span>({book?.volumeInfo?.ratingsCount || '0'})</span>
          </div>
        </Col>
        <Col span={12}>
          <Image
            width={300}
            src={book?.volumeInfo?.imageLinks?.medium}
            alt="Book"
          />
        </Col>
      </Row>
    </StyledPageHeader>
  );
}

export default BookDetails;
