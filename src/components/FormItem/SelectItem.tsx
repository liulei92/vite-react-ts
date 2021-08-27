/*
 * @Description: SelectItem.tsx
 * @Date: 2021-08-24 16:35:39
 * @Author: LeiLiu
 */
import { Select } from 'antd';
import type { SelectProps } from 'antd/es/select';
import React from 'react';

// const { Option } = Select;
import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const selectDefaultProps = {
  allowClear: false,
  clearIcon: null,
  defaultValue: '',
  disabled: false,
  dropdownClassName: '',
  dropdownStyle: {},
  getPopupContainer: () => document.body,
  listHeight: 256,
  // mode
  notFoundContent: 'Not Found',
  options: [],
  placeholder: '',
  showArrow: true,
  size: 'small',
  suffixIcon: null,
  value: '',
  virtual: true,
  childName: '',
  childClassName: '',
  childStyle: undefined,
  onChange: (value: any, option: any | Array<any>): void => {},
  onClear: (e: Event): void => {},
  onSelect: (value: any, option: any): void => {},
};
export type SelectKeysTypes = keyof typeof selectDefaultProps;
export type SelectPropsTypes = Pick<
  SelectProps<string | number> & {
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  SelectKeysTypes
>; // 方式1

const SelectItem: React.FC<FormItemTypes<SelectPropsTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<SelectPropsTypes>(
    others,
    selectDefaultProps,
  ); // 分割

  type PropsExpandTypes = SelectPropsTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle']; // 有规则，必须已child为前缀
  const selectProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  return (
    <FormItem {...formItemProps}>
      <Select {...selectProps} />
    </FormItem>
  );
};

export default SelectItem;
