/*
 * @Description: intl/index.tsx
 * @Date: 2021-08-26 18:48:24
 * @Author: LeiLiu
 */
import { ConfigProvider } from 'antd';
import antEn from 'antd/lib/locale/en_US';
import antZh from 'antd/lib/locale/zh_CN';
import { observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { useSelectors } from '@/store';

import en from './locale.en';
import zh from './locale.zh';

const localeMapper = {
  en: {
    customLocale: en,
    antLocale: antEn,
  },
  zh: {
    customLocale: zh,
    antLocale: antZh,
  },
};

export const $fm = (id: string, values?: Record<string, any>) => {
  return <FormattedMessage id={id} values={values}></FormattedMessage>;
};

const Intl: React.FC = observer(({ children }) => {
  const { app } = useSelectors('app');
  const { locale = 'en' } = app || {};
  const { customLocale, antLocale } = localeMapper[locale];
  return (
    <IntlProvider locale={locale} messages={customLocale}>
      <ConfigProvider
        locale={antLocale}
        getPopupContainer={(trigger) => trigger.parentElement as HTMLElement}>
        {children}
      </ConfigProvider>
    </IntlProvider>
  );
});

export default Intl;
