import React from 'react';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { Shelve } from '../shelve';

export interface AddBookToShelveProps {
  shelves: Shelve[];

  onAddToShelve(shelveName: string): void;
}

export function AddBookToShelveMenu(props: AddBookToShelveProps) {
  const { onAddToShelve, shelves } = props;

  const handleMenuClick = ({ key }) => {
    onAddToShelve(key);
  };

  const shelvesMenu = (
    <Menu onClick={handleMenuClick}>
      {shelves?.map((shelve) => (
        <Menu.Item key={shelve.name}>{shelve.name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={shelvesMenu} trigger={['click']}>
      <Tooltip title="Add to shelve">
        <Button
          type="primary"
          size="large"
          shape="circle"
          data-testid="add-to-shelve"
          icon={<FolderAddOutlined />}
        />
      </Tooltip>
    </Dropdown>
  );
}

export default AddBookToShelveMenu;
