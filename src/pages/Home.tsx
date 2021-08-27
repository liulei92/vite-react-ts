import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import SvgIcon from '@/components/SvgIcon';
import { useSelectors } from '@/store';

const { Option } = Select;

const Home: React.FC = () => {
  const [form] = Form.useForm();
  const list: any[] = [];

  const [visible, setVisible] = useState<boolean>(false);
  const { datex } = useSelectors('datex');

  useEffect(() => {
    console.log('useEffect');
  }, []);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      // eslint-disable-next-line react/display-name
      render: (tags: any[]) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      // eslint-disable-next-line react/display-name
      render: (_: any, record: { key: string }) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              form.setFieldsValue(record);
            }}>
            修改
          </Button>
          <Button danger onClick={() => {}}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleCancle = () => {
    setVisible(false);
  };

  const hanldeOk = () => {
    handleCancle();
    form.validateFields().then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <h2>
        Home {datex?.timeString}
        <Button type="link" size="small" onClick={() => datex?.updateTimeStamp()}>
          update
        </Button>
      </h2>
      <SvgIcon name="布丁" />
      <Space>
        <Button type="primary" onClick={() => setVisible(true)}>
          新增
        </Button>
        <Button onClick={() => {}}>refresh</Button>
      </Space>
      <Card>
        <Table dataSource={list} columns={columns} />
      </Card>
      <Modal
        title="123"
        visible={visible}
        onOk={hanldeOk}
        onCancel={handleCancle}
        afterClose={() => {
          form.resetFields();
        }}>
        <Form form={form}>
          <Form.Item required label="姓名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="年龄" name="age">
            <InputNumber />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select allowClear>
              <Option key="nice" value="nice">
                nice
              </Option>
              <Option key="developer" value="developer">
                developer
              </Option>
              <Option value="loser">loser</Option>
              <Option value="cool">cool</Option>
              <Option value="teacher">teacher</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default observer(Home);
