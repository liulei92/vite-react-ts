/*
 * @Description: utils/validate.ts
 * @Date: 2021-08-25 09:51:26
 * @Author: LeiLiu
 */
/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, 'Function');
}

/**
 * @description: 是否已定义
 */
export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

/**
 * @description: 是否为对象
 */
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}
/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'AsyncFunction');
}
/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
  );
}

/**
 * @description:  是否为字符串
 */
export function isString(val: unknown): val is string {
  return is(val, 'String');
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

/**
 * @param {String} str
 * @returns {Boolean}
 */
export function isJSON(str: string | null) {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      return typeof obj === 'object' && obj;
    } catch (e) {
      // console.log('error：' + str + '!!!' + e)
      return false;
    }
  }
  return false;
}

/**
 * 判断是否是奇数
 * @param x string | number
 */
export function isOdd(x: string | number) {
  if (isNaN(x as number)) {
    return false;
  }
  return (x as number) % 2 === 1;
}

/**
 * 判断是否是偶数
 * @param x string | number
 */
export function isEven(x: string | number) {
  if (isNaN(x as number)) {
    return false;
  }
  return (x as number) % 2 === 0;
}

/**
 * 判断是否是16进制字符串
 * @param {string} x
 */
export function isHex(x: string) {
  return /^([A-Fa-f1-9][A-Fa-f0-9]*|0)$/.test(x);
}

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export function isBase64(str: string): boolean {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

/**
 * @description: 判断字符串是否是mac地址
 * @param {string} str
 */
export function isMAC(str: string) {
  return /^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/i.test(str);
}

/**
 * @description: 判断字符串是否是单播mac地址
 * @param {string} str
 */
export function isUnicastMAC(str: string) {
  if (isMAC(str)) {
    const f = str.split(':')[0];
    const f2 = parseInt(f, 16).toString(2);
    return f2[f2.length - 1] === '0'; // 0 为单播
  }
  return false;
}

/**
 * @description: email
 * @param {string} str
 */
export function isEmail(str: string) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
}

/**
 * 域名
 * @param {string} str
 */
export function isHost(str: string) {
  return /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(
    str,
  );
}

/**
 * @description: url
 * @param {string} str
 */
export function isUrl(str: string) {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(
    str,
  );
}

/**
 * @description: ip地址:端口
 * @param {string} str
 */
export function isIpAndPort(str: string) {
  return /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]).){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/.test(
    str,
  );
}

/**
 * @description: ipv4地址
 * @param {string} str
 */
export function isIpv4(str: string) {
  return /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(str);
}

// todo...

// 验证数字：^[0-9]*$
// 验证n位的数字：^\d{n}$
// 验证至少n位数字：^\d{n,}$
// 验证m-n位的数字：^\d{m,n}$
// 验证零和非零开头的数字：^(0|[1-9][0-9]*)$
// 验证有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
// 验证有1-3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
// 验证非零的正整数：^\+?[1-9][0-9]*$
// 验证非零的负整数：^\-[1-9][0-9]*$
// 验证非负整数（正整数 + 0） ^\d+$
// 验证非正整数（负整数 + 0） ^((-\d+)|(0+))$
// 验证长度为3的字符：^.{3}$
// 验证由26个英文字母组成的字符串：^[A-Za-z]+$
// 验证由26个大写英文字母组成的字符串：^[A-Z]+$
// 验证由26个小写英文字母组成的字符串：^[a-z]+$
// 验证由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
// 验证由数字、26个英文字母或者下划线组成的字符串：^\w+$
// 验证用户密码:^[a-zA-Z]\w{5,17}$ 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
// 验证是否含有 ^%&',;=?$\" 等字符：[^%&',;=?$\x22]+
// 验证汉字：^[\u4e00-\u9fa5],{0,}$
// 验证Email地址：^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
// 验证InternetURL：^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$ ；^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$
// 验证电话号码：^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$：--正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
// 验证身份证号（15位或18位数字）：^\d{15}|\d{}18$
// 验证一年的12个月：^(0?[1-9]|1[0-2])$ 正确格式为：“01”-“09”和“1”“12”
// 验证一个月的31天：^((0?[1-9])|((1|2)[0-9])|30|31)$ 正确格式为：01、09和1、31。
// 整数：^-?\d+$
// 非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$
// 正浮点数 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
// 非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$
// 负浮点数 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
// 浮点数 ^(-?\d+)(\.\d+)?$
