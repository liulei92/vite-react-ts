/*
 * @Description: axios.ts
 * @Date: 2021-08-25 14:53:13
 * @Author: LeiLiu
 */
import { message } from 'antd';
import type { AxiosPromise, AxiosProxyConfig, Method } from 'axios';
import axios from 'axios';

console.log(import.meta.env);
// 创建axios的实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_HTTP_API_DEV as string, //接口统一域名
  timeout: 6000, //设置超时
  headers: {
    'Content-Type': 'application/json;charset=UTF-8;',
  },
});

let loading = false;
//正在请求的数量
let requestCount = 0;
//显示loading
const showLoading = () => {
  if (requestCount === 0 && !loading) {
    console.log('loading start');
  }
  requestCount++;
};
//隐藏loading
const hideLoading = () => {
  requestCount--;
  if (requestCount == 0) {
    console.log('loading close');
  }
};

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    showLoading();
    // 添加token
    const token = window.localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    // 若请求为post 则json化
    if (config.method?.toLowerCase() === 'post') {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    hideLoading();
    return response.data;
  },
  (error) => {
    console.log(error);
    //响应错误
    if (error.response && error.response.status) {
      const status = error.response.status;
      let msg = '';
      switch (status) {
        case 400:
          msg = '请求错误';
          break;
        case 401:
          msg = '请求错误';
          break;
        case 404:
          msg = '请求地址出错';
          break;
        case 408:
          msg = '请求超时';
          break;
        case 500:
          msg = '服务器内部错误!';
          break;
        case 501:
          msg = '服务未实现!';
          break;
        case 502:
          msg = '网关错误!';
          break;
        case 503:
          msg = '服务不可用!';
          break;
        case 504:
          msg = '网关超时!';
          break;
        case 505:
          msg = 'HTTP版本不受支持';
          break;
        default:
          msg = '请求失败';
      }
      message.error(msg);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export type HttpConfig =
  | string
  | {
      method?: Method;
      url: string;
      data?: Record<string, any>;
      config?: AxiosProxyConfig;
    };
export function http<T = any>(params: HttpConfig): AxiosPromise<T> {
  if (typeof params === 'string') {
    return instance.get(params);
  }
  const { method = 'GET', url, data = {}, config } = params;
  const _method = method?.toLowerCase();
  if (_method === 'post') {
    return instance.post(url, data, { ...config });
  } else if (_method === 'put') {
    return instance.put(url, data, { ...config });
  } else if (_method === 'delete') {
    return instance.delete(url, {
      params: data,
      ...config,
    });
  } else if (_method == 'get') {
    return instance.get(url, {
      params: data,
      ...config,
    });
  } else {
    console.error('未知的_method' + _method);
    return Promise.reject(new Error(_method));
  }
}
export type HttpType = typeof http;
window.__HTTP__ = http;

export default instance;
