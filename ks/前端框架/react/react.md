React
## 概述
• setState

• Hooks

•  virtual DOM

• fiber
## 普通问题
> 介绍 React 中 Props 和 State 的作用
- props是父子组件数据传输的渠道，state是组件自身的属性；

> 介绍 React 的核心设计思想？
- 数据驱动；
- 基于MVVM的单向数据流框架，
- 组件是函数式编程；

- key的作用
- diff;
> React 中的是事件对象是原生的吗？React 的合成事件系统是如何实现的？

不是原生的，react合成事件系统：为了防止DOM上面绑定事件过多，影响内存和性能，React,将事件全部冒泡到document上面，然后通过统一的事件监听器处理和分发；
[React源码解析(四):事件系统](https://juejin.im/post/6844903538762448910)

> 什么是受控组件和非受控组件？应用的场景是？

- 区别：受控组件和非受控组件是指组件的状态是否可以被外部控制，可以被外部控制的就是受控组件，不能被控制的就是非受控组件。
- 好的组件设计：需要支持两种模式。当外部需要修改时，可以变成受控；当不需要外部修改时，可以组件自己管理状态，非受控模式。


> React 列表中 key 的作用是什么？

- key没有传入默认使用index作为key; key的作用是在渲染的时候，利用key在做比对，来做节点的复用，做性能优化；
JSX 的本质是什么？

React 组件通信的方式有哪些？
ref 的使用场景？
Virtual DOM 的原理？有什么好处？
React Context 的使用场景？

## React 15.x
介绍 React 15 中主要的生命周期
发网络请求或者 DOM 操作应该放在哪个生命周期中？
setState 之后发生了什么？
什么情况下需要使用 shouldComponentUpdate？
React 自带的 PureComponent 的原理是？
什么是高阶组件？使用场景是？
什么是 Render Props？使用场景是？

## React 16
介绍React 16.x 的 Fiber 架构
React 16.x 的生命周期，以及之前一些生命周期被废弃的原因？
对 React hooks 的理解？相比 Class 组件的优劣是？
> useEffect 的第二个参数的作用是？
是一个数组，传入相应的属性，支持做比对是否需要重新渲染，做性能优化；

> Hooks 为什么需要放在函数顶层？
> React hooks 出现之后是否还需要高阶组件，为什么？
> React Portal 的使用场景
> useReducer 的使用场景？
> useCallback 和 useMemo 的使用场景？

## 问题
1、 如何设计一个自定义表单组件的 API？动态表单组件的设计？
1、 puerComponent做的是shouldUpdateComponent的浅层比较，如果prop是一个深层对象，对象地址没有变，只是增加属性，没有做重新渲染，就会有问题了。

## 学到的点
- 组件职责分明——数据和UI分离。
- 傻瓜组件数据相关逻辑全交由父组件实现；由prop传入做渲染。外层组件只做数据的获取。
-组件状态逻辑自身控制；
- 应用场景：
## 学习资源
[https://juejin.im/book/6844733754326401038/section/6844733754393493512](react相关小册最佳模式和最佳实践)；