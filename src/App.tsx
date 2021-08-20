import 'virtual:svg-icons-register'; // 注册icons

import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import type { IRoute } from './routes';
import { layoutRouteList } from './routes/utils';

const App = () => {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
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
  );
};

export default App;
