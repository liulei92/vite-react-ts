/*
 * @Description: mobx-store
 * @Date: 2021-08-23 09:32:43
 * @Author: LeiLiu
 */
import React, { createContext, useContext } from 'react';

import datex from './modules/store.datex';
import timer from './modules/store.timer';

const store = {
  timer,
  datex,
};

window.__STORE__ = store;

export type StoreTypes = typeof store;

export const StoreContext = createContext<StoreTypes>(store);

// useMobxStore
export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

/**
 * hook: useSelectors 根据多个个 store 名称，返回values
 * @param {string[]} paths
 * @returns {keyof StoreMapper}
 */
export function useSelectors<T extends keyof StoreTypes>(...paths: T[]) {
  return paths.reduce((s: Partial<StoreTypes>, c) => {
    s[c] = store[c];
    return s;
  }, {});
}

// const files: Record<string, any> = import.meta.globEager('./module/*.ts');
// const store = Object.keys(files).reduce((t, c) => {
//   t[c] = files[c]?.default;
//   return t;
// }, {});

/*****匹配根目录文件将通过globEager动态全局导入注册组件--Start*****/
// const modules = import.meta.globEager('./components/*/*.vue')
// for (const path in modules) {
//   app.component(modules[path].default.name,modules[path].default)
// }
