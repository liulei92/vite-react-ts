/*
 * @Description: InputItem.tsx
 * @Date: 2021-08-24 14:22:10
 * @Author: LeiLiu
 */
import { Input } from 'antd';
import type { InputProps } from 'antd/es/input/Input';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const inputDefaultProps = {
  addonAfter: null,
  addonBefore: null,
  allowClear: false,
  bordered: true,
  defaultValue: '',
  disabled: false,
  id: '',
  maxLength: 0,
  prefix: null,
  size: 'small',
  suffix: null,
  type: 'text',
  value: '',
  childName: '',
  childClassName: '',
  childStyle: undefined,
  onChange: (e: Event): void => {},
  onPressEnter: (e: Event): void => {},
};
export type InputKeysTypes = keyof typeof inputDefaultProps;
export type InputPropsTypes = Pick<
  InputProps & {
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  InputKeysTypes
>; // 方式1
export type InputItemRef = {
  childRef: any;
  focus(): void;
};

const InputItem = forwardRef<
  InputItemRef, // T
  FormItemTypes<InputPropsTypes> // P
>((props, parentRef) => {
  const childRef = useRef<any>(null);
  // 透传 https://blog.csdn.net/weixin_43720095/article/details/104967478
  useImperativeHandle(parentRef, () => ({
    childRef,
    focus: () => {
      childRef?.current?.focus();
    },
  }));

  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<InputPropsTypes>(
    others,
    inputDefaultProps,
  ); // 分割

  type PropsExpandTypes = InputPropsTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle'];
  const inputProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  return (
    <FormItem {...formItemProps}>
      <Input ref={childRef} {...inputProps} />
    </FormItem>
  );
});

export default InputItem;
