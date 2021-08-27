import 'virtual:svg-icons-register'; // 注册icons

import { Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useSelectors } from '@/store';

import Intl from './intl';
import type { IRoute } from './routes';
import { layoutRouteList } from './routes/utils';

const App = () => {
  const { app } = useSelectors('app');
  console.log(app?.spinning);
  return (
    <Intl>
      <Spin size="large" spinning={app?.spinning} className="layout__loading">
        <Suspense fallback={null}>
          <Router>
            <Switch>
              {/* 根路径重定向 */}
              <Route exact path="/" component={() => <Redirect to="/manage" />}></Route>
              {layoutRouteList.map((route: IRoute) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  component={
                    route.component
                      ? route.component
                      : () => <Redirect to={route.redirect!} />
                  }></Route>
              ))}
            </Switch>
          </Router>
        </Suspense>
      </Spin>
    </Intl>
  );
};

export default observer(App);
