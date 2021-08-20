/*
 * @Description: SvgIcon.tsx
 * @Date: 2021-08-20 15:34:44
 * @Author: LeiLiu
 */
import React, { memo } from 'react';

interface SvgIconArgs {
  prefix?: string;
  name: string;
  color?: string;
}

const defaultProps: SvgIconArgs = {
  prefix: 'icon',
  name: '',
  color: '#eee',
};

const SvgIcon: React.FC<SvgIconArgs> = (props = defaultProps) => {
  const { prefix = 'icon', name, color = '#eee' } = props;
  const symbolId = `#${prefix}-${name}`;

  return (
    <svg aria-hidden="true">
      <use xlinkHref={symbolId} fill={color}></use>
    </svg>
  );
};

export default memo(SvgIcon);
