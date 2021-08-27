/*
 * @Description: PasswordItem.tsx
 * @Date: 2021-08-24 17:25:34
 * @Author: LeiLiu
 */
import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input/Password';
import React from 'react';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';
import { inputDefaultProps } from './InputItem';

export const passwordDefaultProps = {
  ...inputDefaultProps,
  iconRender: (visible: boolean) => null,
  visibilityToggle: true,
};

export type PasswordKeysTypes = keyof typeof passwordDefaultProps;
export type PasswordPropsTypes = Pick<
  PasswordProps & {
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  PasswordKeysTypes
>;

const PasswordItem: React.FC<FormItemTypes<PasswordPropsTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<PasswordPropsTypes>(
    others,
    inputDefaultProps,
  ); // 分割

  type PropsExpandTypes = PasswordPropsTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle'];
  const inputProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  return (
    <FormItem {...formItemProps}>
      <Input.Password {...inputProps} />
    </FormItem>
  );
};

export default PasswordItem;
