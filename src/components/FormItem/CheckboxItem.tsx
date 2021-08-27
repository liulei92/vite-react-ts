/*
 * @Description: CheckboxItem.tsx
 * @Date: 2021-08-24 18:50:46
 * @Author: LeiLiu
 */
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd/es/checkbox/Checkbox';
import React from 'react';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const checkboxDefaultProps = {
  checked: false,
  defaultChecked: false,
  disabled: false,
  indeterminate: false,
  childLabel: '',
  childName: '',
  childClassName: '',
  childStyle: undefined,
  onChange: (e: Event) => {},
};

export type checkboxKeysTypes = keyof typeof checkboxDefaultProps;
export type checkboxPropsTypes = Pick<
  CheckboxProps & {
    childLabel?: React.ReactNode;
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  checkboxKeysTypes
>;

const CheckboxItem: React.FC<FormItemTypes<checkboxPropsTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<checkboxPropsTypes>(
    others,
    checkboxDefaultProps,
  ); // 分割

  type PropsExpandTypes = checkboxPropsTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle'];
  const checkboxProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);
  const { childLabel = '', ...resets } = checkboxProps;

  return (
    <FormItem {...formItemProps}>
      <Checkbox {...resets}>{childLabel}</Checkbox>
    </FormItem>
  );
};

export default CheckboxItem;
