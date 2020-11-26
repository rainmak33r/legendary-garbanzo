import React from 'react';
import { Button, PageHeader, Form, Input, Rate, Comment } from 'antd';
import { Shelve } from '../shelve';
import { DeleteOutlined } from '@ant-design/icons';
import { Book } from '../../books';
const { TextArea } = Input;

export interface ShelveDetailsProps {
  shelve: Shelve;
  books: Book[];
  onBookClick(id: string): void;
  onAddReview(value): void;
  onDeleteReview(): void;
}

const CommentForm = ({ onFinish }) => (
  <Form onFinish={onFinish}>
    <Form.Item
      name="message"
      label="Comment"
      rules={[{ required: true, message: 'Please leave a comment!' }]}
    >
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item
      name="rate"
      rules={[{ required: true, message: 'Please rate!' }]}
    >
      <Rate />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </Form>
);

const DisplayReview = ({ review, actions }) => (
  <Comment
    author="You"
    actions={actions}
    content={
      <>
        <p>{review?.message}</p>
        <p>
          <Rate value={review?.rate} disabled />
        </p>
      </>
    }
  />
);

export function ShelveDetails(props: ShelveDetailsProps) {
  const { shelve, books, onBookClick, onAddReview, onDeleteReview } = props;

  const handleBookClick = (id: string) => () => onBookClick(id);

  const handleAddComment = (value) => {
    onAddReview(value);
  };

  return (
    <PageHeader
      onBack={() => window.history.back()}
      title={shelve?.name}
      subTitle={shelve?.category}
    >
      <div style={{ marginBottom: '3rem' }}>
        {books?.length > 0 && <h3>Books</h3>}
        {books?.map((book) => (
          <Button type="link" onClick={handleBookClick(book.id)}>
            {book?.volumeInfo?.title}
          </Button>
        ))}
      </div>
      <div>
        {!shelve?.review ? (
          <CommentForm onFinish={handleAddComment} />
        ) : (
          <DisplayReview
            review={shelve?.review}
            actions={[
              <Button
                onClick={onDeleteReview}
                shape="circle"
                icon={<DeleteOutlined />}
              />,
            ]}
          />
        )}
      </div>
    </PageHeader>
  );
}

export default ShelveDetails;
