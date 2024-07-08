import { isObject } from "@vue/shared"

import { reactiveHandlers } from "./baseHandlers"

// weakMap 类型: key: 对象 value: 对象的代理对象; 自动执行垃圾回收机制
const reactiveMap = new WeakMap();

const readonlyMap = new WeakMap();

function createReactObj(target: any, isReadonly: boolean, baseHandlers: ProxyHandler<any>) {
    // target 是否为对象
    if (!isObject(target)) {
        return;
    }

    // 代理优化
    const proxyMap = isReadonly ? readonlyMap : reactiveMap;
    if (proxyMap.has(target)) {
        return proxyMap.get(target) as any;
    }

    // proxy 操作
    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy);

    return proxy;
}

// 响应式对象
export function reactive(target: any) {
    return createReactObj(target, false, reactiveHandlers);
}