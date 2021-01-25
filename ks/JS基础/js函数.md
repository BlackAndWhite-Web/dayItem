### 函数
- 函数是一等公民，可以同其他数据结构一样，当做参数，赋值给变量，函数返回值等处理。

#### 高阶函数
- 入参和返回值有一个是函数；

 函数作为输入
```js
const arr = [1,2,3];
arr.map((item) => item +1);
```

函数作为输出
```js
const isType = (type) => (obj) => {
    return Object.prototype.toString.call(obj) === '[Object ' + type + ']';
}
isType('String')('111'); // true;
```

#### 函数组合
- reduce

#### 函数柯里化
- 本质：1、接收到所有参数后，在执行函数；2、先传入一个函数，封装成curry函数，在慢慢收集参数执行；

#### 偏函数
- 本质：1、固定一个或者多个参数，返回剩余参数的函数；
- 输入： 输入是一个函数和剩余的参数；
- 输出： 返回一个函数；

```js
// 返回一个可以接收剩余参数的函数；
// 输入是一个函数和剩余的参数
function partial(fn) {
  const args = Array.prototype.slice.apply(arguments, 1);
  return function() {
    const newArgs = args.concat(Array.prototype.slice.apply(arguments))
    fn.apply(this, newArgs)
  }
}
```
## 参考
[函数执行](https://juejin.im/post/6892886272377880583#heading-11)