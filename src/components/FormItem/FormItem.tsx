/*
 * @Description: FormItem.tsx
 * @Date: 2021-08-24 10:02:29
 * @Author: LeiLiu
 */
import { Form } from 'antd';
import type { FormItemProps } from 'antd/es/form/FormItem';
import React from 'react';

import { firstToLower } from '@/utils';

// type FormItemTypes = Parameters<typeof Form.Item>[0]; 方式1
// export type FormItemTypes<T = {}> = FormItemProps & T; // 方式2
export const formItemDefaultProps = {
  style: undefined,
  className: '',
  colon: true,
  extra: null,
  getValueFromEvent: (...args: any[]) => {},
  hidden: false,
  initialValue: '',
  label: '',
  labelAlign: 'right',
  labelCol: {},
  name: '',
  normalize: (value: any, prevValue: any, prevValues: any) => {},
  noStyle: false,
  required: false,
  rules: [],
  shouldUpdate: false,
  tooltip: '',
  validateFirst: false,
  validateStatus: '',
  validateTrigger: 'onChange',
  valuePropName: 'value',
  wrapperCol: {},
};
export type KeysTypes = keyof typeof formItemDefaultProps;
export type FormItemTypes<T = {}> = Pick<FormItemProps, KeysTypes> & T;

export function assert<T>(key: any, keys: Record<string, any>): key is T {
  return key in keys;
}

/**
 * 分割props
 * @param {T & FormItemTypes} props
 * @param extra 组件children默认的props对象
 * @returns
 */
export function splitProps<T>(props: T & FormItemTypes, extra: Record<string, any>) {
  const [formItemProps, extraProps] = [{}, {}] as [FormItemTypes, T];
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (assert<KeysTypes>(key, formItemDefaultProps)) formItemProps[key] = props[key];
      else if (assert<keyof T>(key, extra)) extraProps[key] = props[key];
    }
  }
  return { formItemProps, extraProps };
}
/**
 * 扩展props
 * @param expandKeys 有规则，必须已child为前缀
 * @param props
 * @returns props
 */
export function expandProps<T>(expandKeys: string[], props: T): T {
  for (let i = 0; i < expandKeys.length; i++) {
    const key = expandKeys[i] as keyof T;
    if (key in props) {
      const k = firstToLower((key as string).replace('child', '')) as keyof T;
      props[k] = props[key] as any;
      delete props[key];
    }
  }
  return props;
}

export const defaultProps: FormItemTypes = {
  colon: true,
};

const FormItem: React.FC<FormItemTypes> = (props) => {
  const { children, ...others } = props;
  return <Form.Item {...others}>{children}</Form.Item>;
};

export default FormItem;
