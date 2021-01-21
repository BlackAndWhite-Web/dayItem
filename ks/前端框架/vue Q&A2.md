# 前端面试Vue十问十答
### 前言
> 本文已收录在github中，如果觉得还行，点个star, 后面还有更多的系列Q&A哦！这里有体系化的的前端面试题，而对于面试题，前端黑白配只给你画重点。

强调：我们只给画重点，面对面试体系框架，知识的梳理，对于详细的进一步的理解，需要结合源码和官方文档，和业务的实践。毕竟面试造火箭，工作拧螺丝钉。

### 对VUE做一个简单介绍，考察点的汇总,引出题目
说到VUE，想必大家都不陌生，基于MVVM框架，数据驱动的响应式框架，因为其简单上手等特点，被大家所使用。简历中写了vue,面试官不觉的就要问上几题，初步整理了以下相关题目，各位可以自考以下，看看对vue的掌握程度怎么样。

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

日常工作中，不能局限于使用框架，要结合业务多思考，思考框架背后的实现，因为面试不能问你简单的api实现，所以使用一个框架，一定要有对框架底层的了解。这样才能已不变应万变，来应对现在技术快速的变化

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

### 题目2
> vue的组件通信
1、分析考点：各种组件通信方式，基础解决方案，高级解决方案
父子组件通信：父传子：prop 子传父：$emit/$on，事件
其他组件通信（子孙，兄弟组件等)可以采用以下解决方案;
高级：
vue本身提供的钩子函数
    - project,inject。比较灵活，底层库可以使用，不建议业务使用；
    - $children, $parent钩子
除了钩子还能采用以下方案：
    - event bus; 如果事件比较多，散落在业务中各种事件，不利于统一维护。
    - vuex vue提出的解决组件通信的解决方案。

2、答案：
父子组件通信  + vuex 60分：
其他组件通信 其他高级解决方案：一个点加10分；

3、加分项： vue本身可以作为一个通信组件使用；



### 题目三
> 为什么Vue data必须是函数
1、 分析考点：vue组件实例分离， 作用域
每个vue组件实例可以保持一份独立的data属性引用拷贝，各个实例之前不相互影响；这是js语言的特性导致的，只有函数才有自己的作用域。


### 题目四
> vue数据双向绑定和 vuex 是否冲突
1、考点：
- 理解数据双向绑定视图层和数据层响应式，vuex的单向数据流不是一个概念；
- 如何在双向绑定属性中使用vuex的解决方案；


### 5
> 讲讲vue对数组方法做的变异支持的实现。
考点：
- vue为什么不能支持数组方法的响应式
- vue对数组方法做的响应式变异支持内部实现；
答案：
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
加分项：
vue3.0中，采用proxy做依赖收集，解决了Object.propertype做依赖收集对数组，对象属性的添加删除问题；

### 6 介绍Vue template到render的过程
考点：vue的模板渲染的整个过程
- 第一步是parse, 主要是将vue template转换成AST；
- 第二步是optimize, 主要是做一些优化，比如将一些静态节点和不变的节点做上标记，在update的时候减少diff操作；
- 第三步generate，将AST 转换为render function 从而渲染visual DOM;
【缺图】
加分项：对diff算法的了解。

### 7 vue响应式原理
考点：
- vue中的如何劫持组件属性
- 在data更新的时候是基于什么机制同步视图

答案：
【缺图】

加分项：
vue3.0中对响应式的处理；

### 8 vue的nextTick原理

### 9 vue的keep-alive是如何实现的，具体缓存的是什么？
### 10 对vue3.0有了解吗














































### 参考
参考的课程体系和书，比较官方东东。

### 接下来计划
- 接下来十问十答系列题目

### 最后
1、准备做一个前端面试系统， 喜欢和期待的话，点个赞；
2、更多题目收录在github中
3、希望一起加入，可以在评论和issue中贡献你曾经被问到问题，我们一起来分析。

todo
1、图片；
2、是否要做小结：vue的相关考点。
3、参考资料。扩展阅读。题目更多细节；
4、题目的精简的代表性题目，知识点的梳理；
github
5、有个整理题目的题目集；
6、有体系题目的汇总的Q&A；
7、plan和参考学习资源和计划；
