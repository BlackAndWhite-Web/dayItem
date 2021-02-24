## arguments；
arguments是一个类数组的数据结构，表示函数的形参，那么函数形参没有表示出来，传进来有实参，也可以通过arguments获取
```js
// 现在handle是return的函数；所以内部可以通过arguments获取到传入的handle中传入的参数；
const handle = dobunce(fun);  
handle(123);
```
## new 一个对象
弄懂3个关键词，用一张图来描述；
- __proto__; 原型链；
- prototype; 原型对象,是一个存在的对象，独立于constructor；
- constructor; 原型对象的构造函数；

![](https://user-gold-cdn.xitu.io/2020/3/4/170a5a836c3202e6?w=1522&h=1372&f=png&s=453038) 
```js
function newFun() {
    const newObj = {};
    // 第一个参数是构造函数，第二个参数是传进来的其他赋值对象；
    let [constructor, ...args] = [...arguments]; // todo-理解; 
    newObj.__proto__ = constructor.prototype;
    // this这一块走一下；
    let result = constructor.apply(newObj, args);
    // 如果有return 就return 内部对象，没有就返回新返回的newObj;
    if(result && (typeof(result) == 'object' || typeof(result) == 'function')) {
        return result;
    }
    return newObj;
};
```