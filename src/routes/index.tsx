import React, { lazy } from 'react';

const Page404 = React.lazy(() => import('../pages/404'));
const Home = React.lazy(() => import('../pages/Home'));
const About = React.lazy(() => import('../pages/About'));
const Login = React.lazy(() => import('../pages/User/Login'));
const Register = React.lazy(() => import('../pages/User/Register'));

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  exact?: boolean;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  // 菜单栏中隐藏
  hidden?: boolean;
  // 隐藏的角色
  denyRole?: string[];
  // 隐藏的型号
  denyModel?: string[];
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/user',
    component: React.lazy(() => import('../layouts/UserLayout')),
    meta: {
      title: '用户路由',
    },
    exact: false, // 嵌套路由，不能在父级加 exact
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        component: Login,
        exact: false,
        meta: {
          title: '登录',
        },
      },
      {
        path: '/user/register',
        component: Register,
        exact: false,
        meta: {
          title: '注册',
        },
      },
    ],
  },
  {
    path: '/manage',
    component: React.lazy(() => import('../layouts/BasicLayout')),
    meta: {
      title: '系统路由',
    },
    exact: false,
    redirect: '/manage/home',
    children: [
      {
        path: '/manage/home',
        meta: {
          title: '首页',
          icon: 'home',
        },
        exact: false,
        component: Home,
      },
    ],
  },
  {
    path: '/about',
    meta: {
      title: '关于',
      icon: 'about',
    },
    exact: true,
    component: About,
  },
  {
    path: '/error/:id',
    meta: {
      title: '页面不存在',
    },
    exact: true,
    component: Page404,
  },
  {
    path: '/*',
    meta: {
      title: '错误页面',
    },
    redirect: '/error/404',
  },
];

export default routes;
