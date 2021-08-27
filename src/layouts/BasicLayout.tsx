import { Button, Layout, Menu, Spin } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import MyHeader from '@/components/Header';
import { layoutRouteList } from '@/routes/utils';
import { useSelectors } from '@/store';

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = (props) => {
  const history = useHistory();
  console.log(history);
  const { user: USER, app: APP } = useSelectors('user', 'app');
  const { children = [], redirect } = layoutRouteList[1];

  if (!USER?.user) {
    history.push('/user/login?pathname=' + history.location.pathname);
    return null;
  }

  return (
    <Layout>
      <Sider>
        <Button size="large" style={{ width: '100%' }}>
          Vite React TypeScript
        </Button>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {children.map((item) => (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{item.meta.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ height: 60 }}>
          <MyHeader />
        </Header>

        <Content style={{ height: 'calc(100vh - 60px)' }}>
          {/* loading */}
          <Spin spinning={false}>
            <Switch>
              {/* 重定向 写法1 严格模式下的path  */}
              {/* <Route
                exact
                path={path}
                component={() => <Redirect to={redirect || children[0].path} />}
              /> */}
              {children.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  component={route.component}></Route>
              ))}
              {/* 重定向方式2 模糊匹配 */}
              <Route component={() => <Redirect to={redirect || children[0].path} />} />
            </Switch>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
};

export default observer(BasicLayout);
