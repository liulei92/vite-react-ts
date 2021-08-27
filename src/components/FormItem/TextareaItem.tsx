/*
 * @Description: TextareaItem.tsx
 * @Date: 2021-08-25 14:11:57
 * @Author: LeiLiu
 */
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import React from 'react';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const textareaDefaultProps = {
  allowClear: false,
  autoSize: false,
  bordered: true,
  defaultValue: '',
  maxLength: 0,
  showCount: false,
  value: '',
  onPressEnter: (e: Event): void => {},
  onResize: (obj: { width: number; height: number }) => {},
};
export type TextareaKeysTypes = keyof typeof textareaDefaultProps;
export interface TextareaPropsTypes
  extends Pick<
      TextAreaProps & {
        childName?: string;
        childClassName?: string;
        childStyle?: React.CSSProperties;
      },
      TextareaKeysTypes
    >,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {} // 方式1

const TextareaItem: React.FC<FormItemTypes<TextareaPropsTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<TextareaPropsTypes>(
    others,
    textareaDefaultProps,
  ); // 分割

  type PropsExpandTypes = TextareaPropsTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle'];
  const textareaProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  return (
    <FormItem {...formItemProps}>
      <Input.TextArea {...textareaProps} />
    </FormItem>
  );
};

export default TextareaItem;
