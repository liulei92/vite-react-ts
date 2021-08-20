import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { layoutRouteList } from '../routes/utils';

const UserLayout: React.FC = (props) => {
  const { children = [], redirect } = layoutRouteList[0];
  return (
    <Switch>
      {/* 重定向 */}
      {/* <Route
        exact
        path={path}
        component={() => <Redirect to={redirect || children[0].path} />}
      /> */}
      {children.map((route) => (
        <Route key={route.path} path={route.path} component={route.component}></Route>
      ))}
      {/* 重定向方式2 模糊匹配 */}
      <Route component={() => <Redirect to={redirect || children[0].path} />} />
    </Switch>
  );
};
export default UserLayout;
