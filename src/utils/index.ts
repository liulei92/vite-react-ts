/*
 * @Description: utils/index.ts
 * @Date: 2021-08-25 09:48:58
 * @Author: LeiLiu
 */
import { isBase64 } from './validate';

/**
 * 转换MAC
 * @param {string} mac
 * @param {boolean} lowercase
 * @returns {String}
 */
export function convertMAC(mac: string, lowercase = false) {
  if (!mac) return '';
  mac = mac.replace(/\w(?=(\w{2})+$)/g, '$&:');
  if (lowercase) {
    mac = mac.toLowerCase();
  } else {
    mac = mac.toUpperCase();
  }
  return mac;
}

// 日期补零
export function zeroPad(n: number | string) {
  return n.toString().padStart(2, '0');
  // return String(n < 10 ? "0" + n : n);
}

// 首字母大写, 其他不变
export function firstToUpper(str: string): string {
  return str[0].toUpperCase() + str.substr(1);
  // return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}

// 首字母小写，其他不变
export function firstToLower(str: string): string {
  return str[0].toLowerCase() + str.substr(1);
  // return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}

// 数组去重
export const deduplication = (arr: (string | number)[]) => [...new Set(arr)];
// 保留数组中非重复数据
export const filterNonUnique = (arr: (string | number)[]) =>
  arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
// 保留数组中重复元素
export const filterUnique = (arr: (string | number)[]) =>
  arr.filter((i) => arr.indexOf(i) !== arr.lastIndexOf(i));

// 正则表达式转义所有特殊符号 特殊符号包括 \ $ ( ) * + . [ ] ? ^ { } | -
export function escapeSpecialSymbols(regex: string) {
  const map = new Map([
    ['\\', /\\/g],
    ['$', /\$/g],
    ['(', /\(/g],
    [')', /\)/g],
    ['*', /\*/g],
    ['+', /\+/g],
    ['.', /\./g],
    ['[', /\[/g],
    [']', /\]/g],
    ['?', /\?/g],
    ['^', /\^/g],
    ['{', /\{/g],
    ['}', /\}/g],
    ['|', /\|/g],
    ['-', /-/g],
  ]);
  for (const key of map.keys()) {
    regex = regex.replace(map.get(key) as string | RegExp, '\\' + key);
  }
  return regex;
}

// 将对象按照键名排序
export function sortByKey(obj: { [x: string]: any }): {} {
  const newkey: { [x: string]: any } = Object.keys(obj).sort().reverse();
  const newObj: { [x: string]: any } = {}; // 创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    // 遍历newkey数组
    newObj[newkey[i]] = obj[newkey[i]]; // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj;
}

/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    const copyInput = document.createElement('input'); // 创建一个input框获取需要复制的文本内容
    copyInput.value = text;
    document.body.appendChild(copyInput);
    copyInput.select();
    document.execCommand('copy');
    copyInput.remove();
    resolve(true);
  });
};

// 对象转JSON
export const toJSON = (obj: any) => {
  return JSON.stringify(obj, (key, value) => {
    switch (true) {
      case typeof value === 'undefined':
        return 'undefined';
      case typeof value === 'symbol':
        return value.toString();
      case typeof value === 'function':
        return value.toString();
      default:
        break;
    }
    return value;
  });
};

// 检测移动/PC设备
export function detectDeviceType(): string {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
    ? 'Mobile'
    : 'Desktop';
}

/** *
 * @description 原生加密明文
 * @param {string} plaintext
 */
export const encryption = (plaintext: string) =>
  isBase64(plaintext) ? plaintext : window.btoa(window.encodeURIComponent(plaintext));

/**
 * @description 原生解密
 * @param {string} ciphertext
 */
export const decryption = (ciphertext: string) =>
  isBase64(ciphertext) ? window.decodeURIComponent(window.atob(ciphertext)) : ciphertext;
