import React, { RefObject } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';

export interface ShelveAddFormProps {
  formRef: RefObject<FormInstance>;
  onFinish(values: FormValues): void;
}

interface FormValues {
  name: string;
  category: string[];
}

export function ShelveAddForm(props: ShelveAddFormProps) {
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    props.onFinish({
      ...values,
      books: [],
    });
    form.resetFields();
  };

  return (
    <Form
      ref={props.formRef}
      form={form}
      onFinish={handleFinish}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please provide shelve name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please provide a category!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

export default ShelveAddForm;
