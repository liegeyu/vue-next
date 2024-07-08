// 公共方法

// 合并对象
export const extend = Object.assign;

// 判断是否为数组
export const isArray = Array.isArray;

// 判断是否为函数
export const isFunction = (fn: any) => {
    return typeof fn === 'function';
}

// 判断是否为字符串
export const isString = (str: any) => {
    return typeof str === 'string';
}

// 判断是否为数字
export const isNumber = (num: any) => {
    return typeof num === 'number';
}

// 判断数组的 key 是否为 数字
export const inIntergerKey = (key: any) => {
    return isString(key) && key !== "NaN" && parseInt(key) + '' === key;
}

// 判断是否为对象
export function isObject(target: any) {
    return typeof target === 'object' && target !== null;
}

// 判断对象是否存在某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(target: any, key: any) {
    return hasOwnProperty.call(target, key);
}

// 判断值是否相等
export const hasChange = (oldVal: any, newVal: any) => {
    return oldVal !== newVal
}
