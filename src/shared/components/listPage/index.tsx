import React from 'react';
import styled from 'styled-components';
import { Badge, Button, Card, Rate, Space } from 'antd';
import { DeleteOutlined, InfoOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export interface ListProps {
  data: ListItem[];
  onDelete(name: string): void;
  onShelveClick(name: string): void;
}

export interface ListItem {
  id: string;
  title: string;
  description: string;
  rate?: number;
  count: number;
  style?: object;
}

export interface ListItemProps extends ListItem {
  onDelete(name: string): void;

  onDetails(name: string): void;
}

const ListPage = (props: ListProps) => {
  const handleShelveClick = (name) => props.onShelveClick(name);

  const handleDelete = (name) => props.onDelete(name);
  return (
    <Container>
      <Space size="large">
        {props.data?.map((item) => (
          <Item
            {...item}
            onDetails={handleShelveClick}
            onDelete={handleDelete}
          />
        ))}
      </Space>
    </Container>
  );
};

const Item = (props: ListItemProps) => {
  const handleSCardClick = () => {
    props.onDetails(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const Component = () => (
    <Card
      data-testid="shelve-list-item"
      key={props.id}
      style={{ ...props?.style }}
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
      <Card.Meta title={props.title} description={props.description} />
      <Rate disabled value={props.rate} />
    </Card>
  );

  return props.count ? (
    <Badge count={props.count}>
      <Component />
    </Badge>
  ) : (
    <Component />
  );
};

export default ListPage;
