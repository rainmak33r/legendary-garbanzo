import React, { createRef, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Button, message, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { APP_URLS } from '../../routes/app.urls';
import { getRandomGiphy, useLocalStorage } from '../../shared/hooks';
import {
  LS_SHELVES_KEY,
  Shelve,
  ShelveAddForm,
} from '../../shared/components/shelves';
import { PlusOutlined } from '@ant-design/icons';
import ListPage, { ListItem } from '../../shared/components/listPage';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Shelves() {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage();
  const [shelves, setShelves] = useState([]);
  const history = useHistory();
  const query = useQuery();
  const [open, setOpen] = useState(false);
  const formRef = createRef<FormInstance>();

  useEffect(() => {
    const storedShelves = getLocalStorageItem(LS_SHELVES_KEY);
    setShelves(
      query.get('has-reviews') === 'true'
        ? storedShelves.filter((shelve: Shelve) => shelve.review)
        : storedShelves
    );
  }, [query.get('has-reviews')]);

  const handleSubmit = () => {
    formRef.current?.submit();
  };

  const handleFinish = async (values) => {
    const exists = shelves.find(
      (item) => item.name.toLowerCase() === values.name.toLowerCase()
    );
    if (exists) {
      const giphy = await getRandomGiphy('no');
      message.open({
        type: 'warning',
        duration: 5,
        className: 'no-icon-message',
        content: (
          <iframe
            width={giphy.image_width}
            height={giphy.image_height}
            src={giphy.embed_url}
            frameBorder="0"
            title="giphy"
          />
        ),
      });
    } else {
      const updatedShelves = [...shelves, { ...values }];
      setLocalStorageItem(LS_SHELVES_KEY, updatedShelves);
      setShelves(updatedShelves);
      handleClose();
    }
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDelete = (name) => {
    setShelves(shelves.filter((item) => item.name !== name));
  };

  const handleShelveClick = (name) =>
    history.push(APP_URLS.shelveDetails.replace(':name', name));

  const listData: ListItem[] = shelves.map((item: Shelve) => ({
    id: item.name,
    title: item.name,
    description: item.category,
    count: item.books.length,
    rate: item.review?.rate,
  }));

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Button
          data-testid="add-shelve-button"
          type="primary"
          onClick={handleOpen}
          shape="circle"
          icon={<PlusOutlined />}
        />
      </div>
      <ListPage
        data={listData}
        onDelete={handleDelete}
        onShelveClick={handleShelveClick}
      />
      <Modal
        title="Add shelve"
        visible={open}
        onOk={handleSubmit}
        onCancel={handleClose}
      >
        <ShelveAddForm formRef={formRef} onFinish={handleFinish} />
      </Modal>
    </>
  );
}

export default Shelves;
