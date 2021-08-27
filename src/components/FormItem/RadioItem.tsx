/*
 * @Description: RadioItem.tsx
 * @Date: 2021-08-24 10:17:50
 * @Author: LeiLiu
 */
import { Col, Radio, Row, Space } from 'antd';
import type { CheckboxOptionType } from 'antd/es/checkbox/Group';
// import type { RadioChangeEvent } from 'antd/es/radio/interface';
import React from 'react';

import { isObject } from '@/utils/validate';

import type { FormItemTypes } from './FormItem';
import FormItem, { expandProps, splitProps } from './FormItem';

export const radioDefaultProps = {
  defaultValue: '',
  disabled: false,
  options: [],
  optionType: 'default',
  size: 'small',
  value: '',
  colSpan: 0,
  vertical: false,
  verticalSize: 8,
  childName: '',
  childClassName: '',
  childStyle: '',
  onChange: (e: Event): void => {},
};
export type RadioKeysTypes = keyof typeof radioDefaultProps;
export type RadioGroupTypes = Pick<
  Parameters<typeof Radio.Group>[0] & {
    colSpan?: number;
    vertical?: boolean;
    verticalSize?: number;
    childName?: string;
    childClassName?: string;
    childStyle?: React.CSSProperties;
  },
  RadioKeysTypes
>; // 方式1

const RadioItem: React.FC<FormItemTypes<RadioGroupTypes>> = (props) => {
  const { children, ...others } = props;
  const { formItemProps, extraProps } = splitProps<RadioGroupTypes>(
    others,
    radioDefaultProps,
  ); // 分割
  type PropsExpandTypes = RadioGroupTypes & {
    name?: string;
    className?: string;
    style?: React.CSSProperties;
  };
  const expandKeys = ['childName', 'childClassName', 'childStyle'];
  const radioProps = expandProps<PropsExpandTypes>(expandKeys, extraProps);

  // colSpan, vertical 互斥
  const { colSpan, vertical, verticalSize = 8, options, ...resets } = radioProps;
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
        <Radio.Group {...resets}>
          <Row>
            {$options?.map((item, i) => (
              <Col span={colSpan} key={i}>
                <Radio {...item}>{item?.label}</Radio>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      ) : vertical ? (
        <Radio.Group {...resets}>
          <Space direction="vertical" size={verticalSize}>
            {$options?.map((item, i) => (
              <Radio key={i} {...item}>
                {item?.label}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      ) : (
        <Radio.Group options={$options} {...resets}></Radio.Group>
      )}
    </FormItem>
  );
};

export default RadioItem;
