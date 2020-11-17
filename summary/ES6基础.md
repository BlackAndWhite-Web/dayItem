## ES6文档学习
### let 和const
##### ES6中引入了这两种声明变量的形式，和之前var声明变量的区别
- var声明的变量是除了函数作用域和全局作用域的限定，并没有块级作用域的概念，let和const声明的变量是有快级作用域的概念的

    if(true) {
        let a = 1;
    }
    console.log(a)   // 会报错

##### let,const声明的变量区别
> let用于声明变量，const用于声明常量，但是注意：
1.const声明的常量是不可被修改其引用地址的，对于基本类型（字符串，数值等），值就存储于引用地址中；对于引用类型，值存在引用地址所指的地址里；
2.const声明的常量的同时就是要被赋值

#### let,const 声明变量的特点
1. 在ES6中修复顶层对象的属性属于全局对象的坑，所以let,const声明的变量并不会挂在window下，所以也不会存在类似于var声明的变量，变量提升的概念存在

    let a = 1;
    console.log(window.a) // undefined

2. let在同一个作用域内同一个变量不能被重复声明

    let a = 1;
    let a = 1; //  Identifier 'a' has already been declared

### 变量的解构赋值
##### 数组解析
数组解析，解决原理是根据数组的下标索引一一匹配，采用数组来完成变量的赋值；可以从赋值的数组中提取值，匹配给对应的变量赋值，也可支持指定默认值
```js
    let[a,b,c] = [1,2,3]; //  a = 1; b =2; c = 3;
    let [x,y=2] = [1];
```
注意点：
- 数组的解析，赋值的数据格式要是数组不能 **let [a] = 1**;
- 数组的解析，也可支持不完全解析，例如：**let [a,b] = [1]**;

#### 对象的解析
对象的解析，解析原理是与对象中的属性名一一匹配
    let {name,age} = {name:'first',age:16};
注意点：
- 变量没有匹配到解析对象中的属性会为undefined，例如：firstName就会为undefined **let {firstName} = {name:'first',age:16}**

##### 字符串解构
字符串解析原则是先将字符串转会为数组对象，所以也会存在length的属性，解析形式也是类似于数组
    let [a,b,c,d,e] = 'hello';
    let {length} = 'hello' // length=6
##### 数值和布尔类型的解构
数组和布尔类型的解构赋值，先将基本类型数值和布尔类型转换为数值类型对象，布尔类型对象，在进行解析的过程
##### 函数参数的解构
函数的参数解构赋值类型同以上的数组，对象，字符串，数值和布尔类型规则

##### 用途
1. 交换两个变量；
2. 函数返回多个值；以及函数参数；函数的默认值

### proxy
#### proxy是什么
Proxy本质就是一个代理器，给目标对象添加一层拦截器，用来修改某些默认行为(比如：属性的获取，修改等)
- 目前Proxy支持多种拦截操作；要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

#### proxy怎么用
ES6提供了一个构造函数Proxy,支持的拦截操作有13种
```js
new Proxy(target, handler);
```
target是我们要操作的目标对象，handler也是一个对象；可以在handler中包含多种拦截行为；
```js
const proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});
```

#### proxy使用场景；
js弱类型语言，没有的属性就直接赋值了undefined; 可以用withZeroValue对proxy进行一个封装，对一些属性没有设置的属性默认设置零值；
```js
const withZeroValue = (target,zeroValue) => {
    return new Proxy(target, {
        get: function(obj,prop) {
            return (prop in obj) ? obj[prop]: zeroValue;
        }
    
    })
}
const c = {
    name: 1
}
const pos = withZeroValue(c, 0);
```
#### vue中proxy的使用；
MVVM框架，数据是双向绑定的，当数据发现变化，需要同步到模板，双向数据绑定的实现方法中，vue中使用的是数据劫持。vue中使用的Object.defineProperty或者proxy对数据的所有属性进行劫持，
#### Object.defineProperty和proxy的一个比较
- Object.defineProperty无法劫持数组的一个变化；
- 只能劫持对象属性的一个信息，如果是对象是一个深度对象或者属性很多，需要对每个属性进行劫持；
- proxy可以监听数组的变化，和整个对象的变化

### Reflect:
什么东西：Reflect是ES6提供的一个对象；
作用1：对Object对象的一个扩展，将一些属于语言层面上面的属性和方法(Object.defineProperty等)放到了Reflect,使得Object对象变得更加干净
作用2：对Object中一些操作函数化，比如：delete obj.a  => Reflect.deleteProperty(obj,a)
使用：
```js
const proxy = new Proxy({}, {
    get: function(target, name) {
        return Reflect.get(target, name)
    }
})
```

### Symbol
#### Symbol是怎么样的一种数据结构
    Symbol是js基本类型的第七种数据类型（null, undefind, number, string, boolean, object）————Symbol。
    Symbol不是对象，更想是一种类字符串,但是是唯一的，所以不能往Symbol上面赋值属性；
#### 为什么要有Symbol
    Symbol的引入就是为了解决对象属性名冲突的一个问题，保证每一个属性名都是唯一的，不会造成共同开发导致的冲突问题；
#### 使用Symbol注意点
- 1. Symbol用于做对象属性名时，不能用点运算符；要用方括号；点运算符是指代一个具体属性，symbol的值某一种程度上还是一个变量的存在；
- 2. 遍历获取Symbol健名，Object.getOwnPropertySymbols，Reflect.ownKeys;
#### Symbol的使用
- Symbol是一种类似字符串的数据结构，使用时不使用new操作符，直接使用Symbol()函数调用
```js
let s1 = Symbol('foo');
```
#### 应用场景：
##### 1、 魔术字符串 --- 字符串是一个常量枚举值 ,作为属性值；
```js
const shapeType = {
    triangle: Symbol()
}

function getArea(shape, options) {
    var area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = 0.5*options.width*options.height;
            break;
    }
    return area;
}

getArea(shapeType.triangle, {width: 100, height: 100});
```


### class
class某一种程度理解为，就是一个原型对象的类的表现，也有constructor的属性。
```js
class Point {
    // 构造器中，负责实例属性的构建
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // 原型方法
    toString() {
        return this.x + this.y;
    }
}
```

## class
- constructor方法；
- class的静态属性和实例属性(清楚实例属性的位置/对静态属性的一个题案)
- class的get/set属性（清楚是对实例属性的一个get/set的监控）
- class中new.target属性（指向new操作符的构造函数）
- 继承；
- 装饰器
需要进一步去了解类装饰器，方法装饰器相关的一些使用场景；


## 数组的奇技淫巧
### api的学习
array.fill(value, start, end) 填充数组
array.from(arrayLike, mapFn)
array.flat(deep)
arrary.reduce((accumulator, currt, index, arr)=>{},initValue)
Array(100) 生成的是一个长度100，空数组，类数组元素

### 奇技淫巧的学习
两个数组取交集： 去重数组a； 过滤出b不存在的元素；
两个数组取差集： 去重数组a,b；过滤出a中不存在的元素 || b中不存在的元素；
交换变量: [a, b ] = [b, a]
生成剩余变量： [a, ...reset] = 'aaaaaa'

- 形参, 初始变量赋值默认值
1、函数的形参和初始变量可赋值默认值；
2、null不属于空,不可取默认值； undefine可取默认值；
3、默认值参数需放在尾部；

- 类数组&可迭代对象（解构/array.from）

- set
一种类数组的不重复的数据结构


## Set
ES6新推出的一种数据结构，存储的值是唯一的，不会重复，类似于Array的一种数据结构；这是与数组不相同的点；Set是集合，不能像数组用下标取值。
### 使用场景
1、数组去重
```js
const a = [2,3,4,2,3,4];
// 实现1： set可以接收类数组的类型结构；再利用解构转为真正的数组；
const newA = [...new Set(a)]
// 实现2： 利用Array.from()可以将Set转为Array;
const newB = Array.from(new Set(a));
// newA: [2,3,4];
```
2、字符串去重；
```js
const str = 'aasdsfsfs'
[...new Set(str)].join('')
// "asdf"
```
### 原理
往Set中推入的元素，Set是根据set的一种算法来进行确定唯一性，类似于精确匹配——===,除了对NaN的判断，set内部认为NaN是相等的；

### API相关
```js
const set = new Set();
set.add(1) 
set.size();
set.delete(1);
set.clear();
set.has(1);
```
## weakSet
weakSet和Set结构类似，区别有两点
1、weakSet中的数据只能是对象，不能是其他类型的值；
2、weakSet的引用是弱引用；垃圾回收机制不起作用；
3、没有size属性，不能对其实行遍历；

## map
传统的object数据格式，健名只能是字符串，类似于一种hash的数据结构，但是实际情况下存在，object当做key值；所以map结构扩展了之前object对健名数据结构的约束
### 使用
new Map([])接收一个数组，数组里面是一一一个个键值对的描述；
```js
const map = new Map([
    ['name','张三'],
    ['title','Auther'];
])
```
## weakMap
weakMap同weakSet,健名只支持对象类型；其他两点类似；

### 学习到的知识点：
#### for of 
for of 是循环可迭代对象的值，
```js
let iterable = [3, 5, 7];
for (let i of iterable) {
  console.log(i); 
}
// 3,5,7;
```
#### for in
for...in 循环只遍历可枚举属性;一般对于对象的一个可枚举属性的遍历
```js
function Person() {
    this.color = 'red';
}
const tri = {
    name: 'aa',
    age: 12
};
Person.prototype = tri;
const obj = new Person();
for(let i in obj) {
    if(obj.hasOwnProperty(i)) {
        console.log(i)
    }
}
// console: color;
```


