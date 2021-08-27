import { useMount, useRequest, useSetState } from 'ahooks';
import { Button, Card, Checkbox, Form, Input, Radio, Select, Switch } from 'antd';
import { observer } from 'mobx-react';
// import { FormInstance } from 'antd/lib/form';
import { ValidateErrorEntity } from 'rc-field-form/es/interface.d';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  CheckboxGroupItem,
  CheckboxItem,
  FormItem,
  InputItem,
  PasswordItem,
  RadioItem,
  SelectItem,
  SwitchItem,
} from '@/components/FormItem';
import type { InputItemRef } from '@/components/FormItem/InputItem';
import LocaleSelect from '@/components/LocaleSelect';
import { $fm } from '@/intl';
import { useSelectors } from '@/store';
import { http } from '@/utils/axios';

type SizeType = Parameters<typeof Form>[0]['size'];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const initialValues = {
  loginForm: {
    size: 'default',
    user: '',
    alias: 'lucy',
    password: '',
    switch: false,
    agreement: false,
    group: ['a'],
  },
};
const validateMessages = {
  required: '${label} is required!',
};
const validatorPwd = (props: any) => {
  console.log(props);
  return {
    validator: (_: any, value: string) => {
      console.log(_);
      if (value && /^[A-Za-z0-9-+*/]{8,16}$/.test(value)) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error('password is error format'));
      }
    },
  };
};

interface State {
  dogUrl: string;
  [key: string]: any;
}

const Login: React.FC = (props) => {
  const { app: APP, user: USER } = useSelectors('app', 'user');
  const [form] = Form.useForm();
  const history = useHistory();
  const [formSize, setFormSize] = useState<SizeType | 'default'>('default');
  const userInputRef = useRef<InputItemRef>(null);
  const [state, setState] = useSetState<State>({ dogUrl: '' });

  // https://ahooks.js.org/zh-CN/hooks/async
  const { loading, run } = useRequest<{ message: string; status: string }>(
    'https://dog.ceo/api/breeds/image/random',
    {
      manual: true,
      onSuccess: (data, params) => {
        APP?.updateSpinning();
        if (data.status === 'success') {
          setState({ dogUrl: data.message });
        }
      },
    },
  );

  useMount(() => {
    onApiDog();
  });

  useEffect(() => {
    console.log(userInputRef?.current?.childRef);
    userInputRef?.current?.focus();

    // http({
    //   url: 'https://dog.ceo/api/breeds/image/random',
    // }).then((res) => {
    //   console.log(res);
    // });
  });

  const onFinish = (values: any) => {
    const {
      loginForm: { user, password },
    } = values;
    USER?.login(user).then((res) => {
      console.log(res);
      history.push('/manage');
    });
  };

  const onFinishFailed = (error: ValidateErrorEntity) => {
    console.log(error);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  const onReset = () => {
    // form.setFieldsValue({ user: '' });
    // https://github.com/ant-design/ant-design/issues/31825
    // form?.setFields([
    //   {
    //     name: ['loginForm', 'user'],
    //     value: 2333,
    //   },
    // ]);
    form?.resetFields();
  };

  // eslint-disable-next-line no-undef
  const onSizeChange = (e: AnRadioChangeEvent) => {
    setFormSize(e?.target?.value);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const onApiDog = () => {
    APP?.updateSpinning();
    run();
  };

  return (
    <div>
      <h2> {$fm('login')} </h2>
      <div>change this user name {loading ? 'loading' : ''}</div>
      <div>
        <LocaleSelect />
      </div>
      <Card>
        <Form
          {...layout}
          form={form}
          initialValues={initialValues}
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
          size={formSize as SizeType}>
          {/* <FormItem label="尺寸" tooltip="你好" name={['loginForm', 'size']}>
            <Radio.Group onChange={onSizeChange}>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </FormItem> */}
          <RadioItem
            label="尺寸"
            tooltip="你好"
            name={['loginForm', 'size']}
            options={[
              { label: 'Small', value: 'small' },
              { label: 'Default', value: 'default' },
              { label: 'Large', value: 'large' },
            ]}
            vertical={true}
            childStyle={{ width: 300 }}
            onChange={onSizeChange}
          />
          {/* <Form.Item
            label="名称"
            name={['loginForm', 'user']}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          <InputItem
            ref={userInputRef}
            label="名称"
            name={['loginForm', 'user']}
            rules={[{ required: true }]}
            childStyle={{ width: 300 }}
          />
          {/* <Form.Item
            label="alias"
            name={['loginForm', 'alias']}
            rules={[{ required: true }]}>
            <Select style={{ width: 120 }} onChange={handleChange}>
              <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
              <Select.Option value="disabled" disabled>
                Disabled
              </Select.Option>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select>
          </Form.Item> */}
          <SelectItem
            label="alias"
            name={['loginForm', 'alias']}
            rules={[{ required: true }]}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'disabled', label: 'Disabled', disabled: true },
              { value: 'yiminghe', label: 'Yiminghe' },
            ]}
            childStyle={{ width: 300 }}
            extra="longgggggggggggggggggggggggggggggggggg"
          />
          {/* <Form.Item
            label="密码"
            name={['loginForm', 'password']}
            validateFirst={true}
            rules={[{ required: true }, (props) => validatorPwd(props)]}>
            <Input.Password />
          </Form.Item> */}
          <PasswordItem
            label="密码"
            name={['loginForm', 'password']}
            validateFirst={true}
            rules={[{ required: true }, (props) => validatorPwd(props)]}
            childStyle={{ width: 300 }}
          />
          {/* <Form.Item
            label="Switch"
            name={['loginForm', 'switch']}
            valuePropName="checked">
            <Switch />
          </Form.Item> */}
          <SwitchItem
            label="Switch"
            name={['loginForm', 'switch']}
            valuePropName="checked"
          />
          {/* <Form.Item
            name={['loginForm', 'agreement']}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailLayout}>
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item> */}
          <CheckboxItem
            name={['loginForm', 'agreement']}
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            childLabel={
              <>
                I have read the <a href="">agreement</a>
              </>
            }
            {...tailLayout}
          />
          {/* CheckboxGroupItem */}
          <CheckboxGroupItem
            label="分组"
            name={['loginForm', 'group']}
            options={[
              { value: 'a', label: 'A' },
              { value: 'b', label: 'B' },
              { value: 'c', label: 'C' },
              { value: 'd', label: 'D' },
            ]}
            childStyle={{ width: 300 }}
            colSpan={8}
          />

          <FormItem {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              提交1
            </Button>
            <Button type="primary" onClick={onSubmit} style={{ marginRight: 10 }}>
              提交2
            </Button>
            <Button htmlType="button" onClick={onApiDog} style={{ marginRight: 10 }}>
              API-DOG
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </FormItem>
        </Form>
      </Card>
      <Card>
        <img src={state.dogUrl} alt="dogUrl" style={{ width: 100 }} />
      </Card>
    </div>
  );
};
export default observer(Login);
