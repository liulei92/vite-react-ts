/*
 * @Description: SwitchItem.tsx
 * @Date: 2021-08-24 17:47:37
 * @Author: LeiLiu
 */
import { Switch } from 'antd';
import type { SwitchProps } from 'antd/es/switch';
import React from 'react';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const switchDefaultProps = {
  checked: false,
  checkedChildren: null,
  defaultChecked: false,
  disabled: false,
  loading: false,
  size: 'small',
  unCheckedChildren: null,
  childTitle: '',
  childName: '',
  childClassName: '',
  childStyle: undefined,
  onChange: (checked: boolean, e: MouseEvent): void => {},
};

export type SwitchKeysTypes = keyof typeof switchDefaultProps;
export type SwitchPropsTypes = Pick<
  SwitchProps & {
    childTitle?: string;
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  SwitchKeysTypes
>;

const PasswordItem: React.FC<FormItemTypes<SwitchPropsTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<SwitchPropsTypes>(
    others,
    switchDefaultProps,
  ); // 分割

  type PropsExpandTypes = SwitchPropsTypes & {
    title?: string;
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childTitle', 'childName', 'childClassName', 'childStyle'];
  const switchProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  return (
    <FormItem {...formItemProps}>
      <Switch {...switchProps} />
    </FormItem>
  );
};

export default PasswordItem;
