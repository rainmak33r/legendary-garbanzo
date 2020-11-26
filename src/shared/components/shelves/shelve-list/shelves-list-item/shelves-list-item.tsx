import { Button, Card, Rate } from 'antd';
import { DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import React from 'react';
import { Shelve } from '../../shelve';

interface Props {
  shelve: Shelve;

  onDelete(name: string): void;

  onDetails(name: string): void;
}

export function ShelveListItem(props: Props) {
  const { name, review, books, category } = props.shelve;

  const handleSCardClick = () => {
    props.onDetails(name);
  };

  const handleDelete = () => {
    props.onDelete(name);
  };

  return (
    <Card
      data-testid="shelve-list-item"
      key={name}
      style={{ width: 240 }}
      actions={[
        <Button
          shape="circle"
          onClick={handleSCardClick}
          icon={<InfoOutlined />}
        />,
        <Button
          shape="circle"
          onClick={handleDelete}
          icon={<DeleteOutlined />}
        />,
      ]}
    >
      <Card.Meta title={name} description={category} />
      <p>
        Has <strong>{books?.length}</strong> book
        {books?.length === 1 ? '' : 's'} on it
      </p>
      {review && (
        <div>
          <p>{review?.message}</p>
          <Rate disabled value={review?.rate} />
        </div>
      )}
    </Card>
  );
}
