import { Space } from 'antd';
import React from 'react';

import { useSelectors } from '@/store';

const Header: React.FC = () => {
  const { user: USER } = useSelectors('user');

  return (
    <Space style={{ color: 'white' }}>
      <strong>Header</strong>
      <span>
        {/* user */}
        user：<em>{USER?.user}</em>
      </span>
    </Space>
  );
};
export default Header;
