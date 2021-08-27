/*
 * @Description: LocaleSelect.tsx
 * @Date: 2021-08-26 18:58:07
 * @Author: LeiLiu
 */
import { UpOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';

import { useSelectors } from '@/store';

const LocaleSelect = () => {
  const { app } = useSelectors('app');

  return (
    <Select
      className="locale-select"
      value={app?.locale}
      onChange={app?.updateLocale}
      suffixIcon={<UpOutlined />}>
      <Select.Option value="en">English</Select.Option>
      <Select.Option value="zh">中文</Select.Option>
    </Select>
  );
};

export default observer(LocaleSelect);
