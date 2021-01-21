## vue
> 概况
- 数据绑定原理
- vue3.0
- virtual DOM
- 生命周期

> 1.计算属性和普通属性的区别
计算属性 VS 方法(method)
- 计算属性带有缓存，如果计算属性所依赖的属性没有变，就直接读取缓存;

2.计算属性 VS watch
- 共同点：都是基于数据的改变，自动做响应式数据变化。
- 计算属性的使用场景是一个数据依赖另外一个属性(依赖的多个数据，影响一个数据)，带有缓存；watch是监听在一个数据变化做一些处理（依赖的一个数据，影响多个数据）

> 计算数据缓存实现的原理
- watcher;  computed中的每个属性生成了一个属性的watcher来跟踪；
- computed有一个lazy属性标识它是惰性和有缓存的；
```js
Object.defineProperty(vm, 'sum', { 
    get() {
        // 从刚刚说过的组件实例上拿到 computed watcher
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if (watcher) {
          // ✨ 注意！这里只有dirty了才会重新求值
          if (watcher.dirty) {
            // 这里会求值 调用 get
            watcher.evaluate()
          }
          // ✨ 这里也是个关键 等会细讲
          if (Dep.target) {
            watcher.depend()
          }
          // 最后返回计算出来的值
          return watcher.value
        }
    }
})
```

> 3.vue的keep-alive是如何实现的，具体缓存的是什么？

1、vue的keep-alive是一个内置组件，将一些不活动的组件实例缓存到内存中，而不是将其销毁，从而提升性能，缓存的是组件实例的vnode
具体实现：
- created中抽象出一个cache对象；
- 在render的时候，将符合条件(include,exclude匹配)的组件在cache中缓存起来，重新渲染的时候在将vnode从cache中取出渲染；

[keep-alive
](https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8Akeep-alive%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BD%BF%E7%94%A8%E5%8F%8A%E5%85%B6%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86.MarkDown)


> 4、vue的nextTick原理
- vue异步更新队列： vue中定义了一个callback队列来缓存同一次事件循环中，所有数据变更的回调，并且在这里会做一个同样数据更新的去重操作。
- 实现原理：nextTick是产生一个回调函数加入task或者microtask中，当前调用栈执行完后，执行microtask，起到了异步触发的目的；
- 流程：当响应式数据发生变化时，setter会通知Dep, Dep会调用它管理的所有的watch对象。update时，将异步推送到观察者的队列中，下一个tick调用中，重要的是timerFunc实现中，实现异步更新的关键，vue中实现了promise, mutationObserver和setTimeout根据不同环境的一个处理和降级支持。

> 5、讲讲vue对数组方法做的变异支持的实现。
- 不支持是因为vue对数组和对象的响应式存在缺陷，object.defineProperty对对象和数组的添加和删除感应；
- 采用数组原型劫持后，基于复制过的数组原型对象的功能进行扩展；
```js
const { def } = require("../utils");

// 拿到原型对象，在基于copy的原型对象做扩展
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reserve',
  'splice',
  'sort',
];

methodsToPatch.forEach((method) => {
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    // 做响应式处理
    const ob = this.__ob__;
    let inserted;
    switch(method) {
      case 'push':
      case 'unshift':
          inserted = args;
          break;
      case 'splice':
          inserted = args.slice(2);
          break;
    }
    if(inserted) ob.observeArray(inserted);
    ob.dep.notify();
    return result
  })
})
```
参考：
[Vue源码解析之数组变异](https://www.cnblogs.com/karthuslorin/p/10045326.html)

> 6、介绍Vue template到render的过程
- 第一步是parse, 主要是将vue template转换成AST；
- 第二步是optimize, 主要是做一些优化，比如将一些静态节点和不变的节点做上标记，在update的时候减少diff操作；
- 第三步generate，将AST 转换为render function 从而渲染visual DOM;

> 7、聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的
- Object.defineProperty 对vue的所有data属性做依赖收集的get, set;
- 依赖收集
observe; get收集Dep.target;
- 订阅者
Dep;
- 观察者
watcher（每一个组件都有一个watcher实例）
Dep.target = this(当前vue组件实例)
- 定义vue组件
实例化watcher

[剖析 Vue.js 内部运行机制](https://juejin.im/book/6844733705089449991/section/6844733705228025869)

> 8、为什么Vue data必须是函数

每个vue组件实例可以保持一份独立的data属性引用拷贝，各个实例之前不相互影响；这是js语言的特性导致的，只有函数才有自己的作用域。

> 在 Vue 中，子组件为何不可以修改父组件传递的 Prop; vue是如何检测的
- 单向数据流， 可以使得数据流更加规范，便于追踪数据，避免数据混乱；
- 检测： 在InitProp的时候会调用defineReactive，在set的时候会去判断，如果不是根组件和在updatingChildren中被修改就会warn;
```js
if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
```
> 9、双向绑定和 vuex 是否冲突

vuex代表单向数据流，双向绑定是视图层和数据层的响应式渲染，不是一个维度的东西。如果数据双向绑定属性需要使用vuex。
1、可以将v-model拆分成value属性和click事件触发；但是会浪费一些model的特性功能；
1、采用computed,在set里面去commit mutaion store的state;

> Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

- 对数组中的下标变化劫持不到，导致通过下标修改数组，不能及时响应。目前vue针对array做了一些hack;
- defineProperty对深层对象属性，还有深度遍历监听（递归 + 遍历), Poxy可以劫持整个对象；
- 对对象属性的劫持需要提前在对象中，定义，后续新增的属性劫持监控不到；

> 10、Vue 的父组件和子组件生命周期钩子执行顺序是什么

原则：从外到内，在从内到外;
- 加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
- 子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
- 父组件更新过程
父beforeUpdate->父updated
- 销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed


> Vue3.0都有哪些重要新特性？
建议往Composition API和Tree-shaking方面答，对应比较React Hooks和webpack 的Tree-shaking
1、ts重写了vue;

> Vue3.0和React 16.X 都有哪些区别和相似处？
> Vue3.0 对比Vue2.0的优势在哪？
> Vue3.0是如何实现代码逻辑复用的？
- composition api, 可以先对比Composition API和mixin的差异


> 怎么看待virtual dom？ast语法树了解吗？vue-loader做了哪些事情？vue diff？vue computed和watch区别？computed怎么实现的缓存（dirty）？vue3双向数据绑定实现？createRender？和vue2有哪些不同，提到了函数式编程，说下对函数式编程对的理解


### 补充知识点
- 对Object.defineProperty理解,
```js
const aa = {a:1,b:2};
Object.defineProperty(aa,'a', {
    configurable: true, // 该属性为true，该描述符才能改变
    enumerable: true, // 该属性为true,才会出现在对象的枚举属性中
    writable: true, // 该属性为true,才能被重写
    value: 222, // 重写的值
    get() {}, //函数返回值就是属性的值
    set() {} // 属性修改时会调用该函数；
})
```

#### vuex
1、 vuex数据流
vuex内部实现图，单向数据流，包装数据的可靠性。
(dispatch) -> action -> (commit) -> mutation -> state
![](./vuex.jpg)

2、vue mixin
影响所有的vue的实例，所以慎用
```js
// mixin
Vue.mixin({
  created: function() {
    const myOption = this.$options.myOptions;
    if(myOption) {
      console.log(myOption);
    }
  }
})
```

3、vuex 将store全局注入vue各个实例
```js
// vuex vuexInit 全局挂载store;
function vuexInit() {
  const options = this.options;
  if(options.store) {
    this.$store = options.store
  } else {
    this.$store = options.parent.$store;
  }
}
```

### vue3.0
总结：用vue3.0做了一些性能优化，用ts重写了；并且仿造react做了一些处理，和更加完善react这些属性；
1、性能优化相关, 模板编译；
- vsDOM的优化，标识静态节点，静态属性，可以将静态节点抽离出render函数中
- 静态节点数量多，会直接做innerHTML插入，不会做vsDOM
- 事件绑定：事件绑定会被分析，会被cache起来；父子组件，传递的function;useMobel

Tree-Shaking（编译器实现）
- ES module包起来；

2、 Composition API
3、 fragments;
不需要一个div包起来，可以放几个div,会变为碎片；

4、TS重写vue

1、英文学习
2、composition api学习；
3、vue && react框架对比 相互学习；


### 题目列举
- 1.计算属性和普通属性的区别
- 3.vue的keep-alive是如何实现的，具体缓存的是什么？
- 5、讲讲vue对数组方法做的变异支持的实现。
- 6、介绍Vue template到render的过程
- 为什么Vue data必须是函数
- 双向绑定和 vuex 是否冲突
- Vue 的父组件和子组件生命周期钩子执行顺序是什么
- vue的组件通信；


### 题目分类（可以弄一张脑图汇总）
1、原理题
- 讲讲vue对数组方法做的变异支持的实现。
- 介绍Vue template到render的过程
- vue响应式原理

2、常用特性
- 计算属性和普通属性的区别
- vue的组件通信；
- 为什么Vue data必须是函数
- 双向绑定和 vuex 是否冲突

3、高级特性
- vue的nextTick原理
- vue的keep-alive是如何实现的，具体缓存的是什么？

3、未来特性考察
- 对vue3.0有了解吗

### 题目1
> 计算属性和普通属性的区别
1、分析考点， 为什么要抽象计算属性出来，计算属性有什么特性，计算属性和其他属性的对比
- 为什么要有计算属性：用来处理复杂逻辑的模板运算，减少在模板内做太多逻辑，避免模板过重而难以维护。
- 计算属性特性：缓存。所依赖的属性发生变化才会重新计算更新视图。无变化，下一次不会重新计算，直接用缓存的数据。适用于计算复杂耗性能的计算场景。
- 计算属性和其他属性横向对比：computed vs method vs watch
调用方式：method方法调用；computed像成员属性一样访问；computed是带有缓存，如果所依赖数据没变，不会重新调用；method是每次都重新调用
使用场景：computed一个数据依赖另外一个属性(依赖的多个数据，影响一个数据)，带有缓存；watch是监听在一个数据变化做一些处理（依赖的一个数据，影响多个数据）

2、答案 为什么要有计算属性 + 计算属性特性 + 横向对比
回答为什么要有计算属性 + 计算属性特性 + 横向对比 80
回答计算属性缓存实现 加分项 20

3、答案引申更多。。。
计算属性的缓存是怎么实现的。