/*
 * @Description: global.d.ts
 * @Date: 2021-08-23 09:46:07
 * @Author: LeiLiu
 */
import type { StoreTypes } from '../_store';
/**
 * 一些基本的全局类型声明
 */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

/**
 * Func; Func<string>; Func<[string]>; Func<[string, number]>
 */
// declare type Func<T extends any[] | any = any> = (
//   ...args: T extends any[] ? T : [T]
// ) => any;

declare global {
  interface Window {
    __STORE__: StoreTypes;
  }
}
