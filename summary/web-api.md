## Web API
### DOM
> 描述 DOM 事件流（addEventListener 的第三个参数是？）
- 事件流有两种1、事件冒泡（从内到外）；2、事件捕获（从外到内）；网景主张捕获，微软主张冒泡，w3c统一了，规定先捕获再冒泡；
- addEventListener的第三个参数是否捕获;true捕获，false冒泡

> 哪些事件是冒泡阶段触发的，哪些是捕获阶段触发的？请列举一些?

> querySelectorAll 返回的是数组吗？
返回的是一个类数组的结构，返回当前符合className的节点列表，NodeList。不是数组，而是类数组，没有数组相关的push,pop等api;

> 如何拿到一个元素的尺寸和坐标？
> 如何判断元素尺寸是否发生变化？
> 如何监听元素是否滚入可视区域？
1、根据el.offsetTop - document.documentElement.scrollTop <= viewPortHeight(window.innerHtml, document.documentElement.clientHeight);
2、el.offsetTop - document.documentElement = el.getBoundingClientRect().top;

### 补充
需要弄懂的几个概念元素：
- offsetLeft, offsetTop（相对应父元素的偏移距离);
- offsetWeight, offsetHeight(border + padding + content的宽高);
- clientWidth, clientHeight(padding + content的宽高);
- scrollLeft, scrollTop:(该元素包括滚动隐藏的区域，相对该元素的top,left的长度);
- scrollHeight, scrollWidth(元素的实际宽高，包括隐藏区域的)
- getBoundingClientRect, 获取元素自身属性相关

[如何判断元素是否进入可视区域viewport](https://juejin.im/post/6844903725249609741)
本地存储
列举你所知道的浏览器本地存储机制
LocalStorage 和 Cookie 的区别
Cookie 的 httpOnly 属性的作用是？
网络请求
Fetch 和 XHR 的区别是什么？
如何取消一次网络请求？
Web Worker
介绍 PWA
Web Worker 的使用场景？ 
WASM
WASM 的使用场景？
通信
介绍 WebRTC 协议和使用场景
介绍 WebSocket 协议和使用场景
Canvas/WebGL/SVG
Canvas 和 SVG 的区别和使用场景？

### 垃圾回收