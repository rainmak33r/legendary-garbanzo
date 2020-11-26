import React from 'react';
import { Space } from 'antd';
import { Shelve } from '../shelve';
import { ShelveListItem } from './shelves-list-item/shelves-list-item';

export interface ShelveListProps {
  shelves: Shelve[];
  onDelete(name: string): void;
  onShelveClick(name: string): void;
}

export function ShelveList(props: ShelveListProps) {
  const { shelves, onDelete, onShelveClick } = props;

  const handleShelveClick = (name) => onShelveClick(name);

  const handleDelete = (name) => onDelete(name);

  return (
    <Space>
      {shelves.map((shelve) => (
        <ShelveListItem
          key={shelve.name}
          shelve={shelve}
          onDelete={handleDelete}
          onDetails={handleShelveClick}
        />
      ))}
    </Space>
  );
}

export default ShelveList;
