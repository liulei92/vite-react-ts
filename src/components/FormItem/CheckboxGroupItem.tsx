/*
 * @Description: CheckboxGroupItem
 * @Date: 2021-08-25 09:24:53
 * @Author: LeiLiu
 */
import { Checkbox, Col, Row } from 'antd';
import type {
  CheckboxGroupProps,
  CheckboxOptionType,
  CheckboxValueType,
} from 'antd/es/checkbox/Group';
import React from 'react';

import { isObject } from '@/utils/validate';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const checkboxGroupDefaultProps = {
  defaultValue: [],
  disabled: false,
  options: [],
  value: [],
  colSpan: 0,
  childName: '',
  childClassName: '',
  childStyle: undefined,
  onChange: (checkedValue: Array<CheckboxValueType>) => {},
};

export type checkboxGroupKeysTypes = keyof typeof checkboxGroupDefaultProps;
export type checkboxGroupPropsTypes = Pick<
  CheckboxGroupProps & {
    colSpan?: number;
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  checkboxGroupKeysTypes
>;

const CheckboxGroupItem: React.FC<FormItemTypes<checkboxGroupPropsTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<checkboxGroupPropsTypes>(
    others,
    checkboxGroupDefaultProps,
  ); // 分割

  type PropsExpandTypes = checkboxGroupPropsTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle'];
  const checkboxGroupProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  const { colSpan, options, ...resets } = checkboxGroupProps;
  let $options: CheckboxOptionType[] = [];
  if (options) {
    $options = options.map((item) => {
      if (!isObject(item)) return { value: item, label: item };
      else return { ...item };
    });
  }

  return (
    <FormItem {...formItemProps}>
      {colSpan && colSpan > 0 ? (
        <Checkbox.Group {...resets}>
          <Row>
            {$options?.map((item, i) => (
              <Col span={colSpan} key={i}>
                <Checkbox {...item}>{item?.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ) : (
        <Checkbox.Group options={$options} {...resets}></Checkbox.Group>
      )}
    </FormItem>
  );
};

export default CheckboxGroupItem;
