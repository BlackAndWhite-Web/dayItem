### apply, call, bind;
已总结 apply&bind&call.md
问题：
1. apply call bind的区别比较；
2. 手写apply call bind

考点： apply bind call真正理解内涵，显示改变函数作用域， fn.call(context, ...);

### new
已总结 实现new关键字
问题：
1、实现一个new关键字

考点：
- 创建一个空对象；
- 执行一下构造函数；
- 新对象的__prop__ 指向原型对象；
- 将this指向构造函数&并执行；
- 有返回就返回，没有返回就返回这个对象；

### 继承 
- 6种继承的一个实现和利弊和
- ES6 extend class的继承实现;
寄生组合式继承
- 在子类里面直接调用父类；
- 利用一个副本(创建一个父类原型对象)，
```js

```


