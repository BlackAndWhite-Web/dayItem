# vue基础知识详解
## 模板渲染到DOM
- compile 编译成AST
- render渲染成V-DOM;
- create成真实DOM；
- 插到root节点上去；
（patch比对做比对，diff操作，重新更新）

## watch computed filter
### watch
- watch更多的是用在了异步操作或者是开销较大的操作(异步操作包括了：对props的处理，emit的处理和请求相关)
- 目前业务更多的是用在了对prop值的监听，对当前组件data的一个赋值和调整。

### computed
- 计算属性，复杂的数据处理，给模板解耦；
- computed会有缓存，相比method的方法来说，对于computed会有一定缓存，如果computed计算的依赖属性值没有改变，那么重新渲染时，不会重新渲染computed中的属性，优化性能。

### filter
过滤器，对数据的一些格式做处理相关；

## slot
- 插槽，自定义组件模板相关；
- 插槽内容 <slot></slot>
- 插槽默认内容<slot>default</slot>，可以实现默认的一个内容实现；
- 具名插槽：可以实现使用多个插槽的业务实例；
- 插槽作用域：父组件的作用域和插槽子组件的作用域是单独的。(?插槽作用域的传递相关)


## sync
- 异步操作，异步处理相关,vue的数据流是单向的。但是如果需要双向的就使用触发事件来实现，这个时候就需要sync来实现一个异步操作。

## mixin
- 组件的组合，将组件进行组合相关。组件没有继承的一个概念在，但是有组合的一个能力暴出。

## vuex
- vue的状态管理相关，状态中间管理机制；
- 由于vuex的存储是响应式的，所以在store中获取某个state的方法是从computed中返回某个状态；并且computed中可以访问到store中的值，是所有组件都注册实现的。
- 在单页系统中，多个组件中有一些共享状态需要集中管理相关。这些共享状态可以放在一个全局的。
```js
// 获取vuex中的state
store.state.count
// 修改vuex中的state
store.commit('increment');
// vuex中维护的mutations和state
store = {
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
}
```
### state
组件的一个数据维护，组件中获取vuex中的数据，在computed中去获取，因为根组件子组件的computed中全部注册了store;
### Getter
对state中有一些额外的处理，如果多个组件都有同一个处理，可以封装在Getter中，共用；
### mutation
修改vuex中的数据，只能通过commit mutation进行操作。但是要注意修改的行为是同步的。
### action
修改vuex中的数据，是异步的操作处理。但是action提交的是mutation。store.dispatch来触发action;


参考
https://zhuanlan.zhihu.com/p/79833863

问题：
1、两个组件引用同一个data