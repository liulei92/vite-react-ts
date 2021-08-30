import './basicLayout.less';

import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSetState } from 'ahooks';
import { Layout, Menu, Spin } from 'antd';
import { observer } from 'mobx-react';
import { relative } from 'path';
import React from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import MyHeader from '@/components/Header';
import { layoutRouteList } from '@/routes/utils';
import { useSelectors } from '@/store';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayout: React.FC = (props) => {
  const history = useHistory();
  const { user: USER, app: APP } = useSelectors('user', 'app');
  const { children = [], redirect } = layoutRouteList[1];
  const [state, setState] = useSetState({ collapsed: false });

  const onCollapse = () => {
    setState({ collapsed: !state.collapsed });
  };

  if (!USER?.user) {
    history.push('/user/login?pathname=' + history.location.pathname);
    return null;
  }

  return (
    <Layout className="basic-layout" style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="basic-layout__logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[children[0]?.path]}>
          {children.map((item) => (
            <Menu.Item key={item.path} icon={<PieChartOutlined />}>
              <Link to={item.path}>{item.meta.title}</Link>
            </Menu.Item>
          ))}
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ height: 60, position: 'relative' }}>
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: onCollapse,
          })}

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
