### apply, call, bind;
已总结 apply&bind&call.md
问题：
1. apply call bind的区别比较；
2. 手写apply call bind

考点： apply bind call真正理解内涵，显示改变函数作用域， fn.call(context, ...);
重点：

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
// 组合继承： 缺点： 调用了两次父类
function Parent(value) {
  this.val = value
}

Parent.prototype.getValue = function() {
  console.log(this.val)
}

// 继承父类属性
function Child(value) {
  Parent.call(this, value);
}

// 继承原型对象上的属性；重写了原型，所以需要重写一下constructor
Child.prototype = new Parent()
Child.prototype.constructor= Child

const child = new Child(1);

child.getValue() // 1
child instanceof Parent // true
```


<!-- 寄生组合继承 -->
```js
// 子类继承父类的方法，只需要传入子类和父类，只需包装一个父类原型的副本，重写一下constructor属性；
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
```

```js
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
```

## Trim的实现
考点：考察对正则的一个了解和使用，
- 转译字符空白符 \s;
- /g 全局匹配
```js
// 方法1
String.propertype.trim = function() {
  this.replace(/^\s+|\s$/g, '')
}

// 方法2
String.propertype.trim = function() {
  this.replace(/^\s+/,'').replace(/\s+$/,'');
}

```

