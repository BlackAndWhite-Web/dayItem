## 引用类型
> js中的引用类型有Object,Array,引用类型和原始类型最大的区别是，引用类型内存存储的是数据的存储指针，而原始类型内存存储的就是数据的值；

### 1、js引用类型导致的副作用；
- 数据赋值，导致数据流的管理混乱
- 代码隐藏bug,bug定位困难；

### 2、深拷贝和浅拷贝；
#### 浅拷贝（只拷贝第一层）
- ES6 api: Object.assign(obj);
- 扩展运算符：{...obj};

#### 深拷贝（深度拷贝）
- JSON.parse(JSON.stringify(obj));
    - 1、对特殊数据类型拷贝会存在问题；function,稀疏数组，正则；
    - 2、会修改函数的构造器（constructor);
    - 3、对象循环引用拷贝会报错
- 递归深拷贝的函数实现；
特殊类型的判断和处理 Date, req, Array;
递归处理对象；

todo: 深拷贝的实现

### 3、vue的prop
#### vue中的双向数据绑定；
1、数据依赖收集 -- Object.defineProperty();
2、watch机制，订阅发布机制；

#### vue单向数据流，对深层引用类型prop,给到子组件中的解决方案；
- 1、浅拷贝： Object.assign();扩展运算符
- 2、深拷贝： JSON.parse(JSON.stringify())
- 3、思考是否这个对象需要被更改，如果只是只读，那就不需要拷贝赋值？

### 4、纯函数和不纯函数
- 相同输入，相同输出；
- 对外界不影响，有相关的return;
- 引用类型形参，会影响外面，不纯的函数；

### 5、函数式编程 —— 命令式编程和声明式编程；
- 组件化拆分，功能拆分函数式； 
- 命令式编程： 给到具体执行步骤到程序去执行；

## 常用的数据格式转换的几种方式
### 1、多层数组对象里面提取某个对象；
```js
const arr = [{
    name:'a',
    paths: [{
        url: 'xxx1.jpg'
    }]
}, {
    name:'b',
    paths: [{
        url: 'xxx2.jpg'
    }]  
}]

const pickUrl = arr.map(item => {
    return item.paths.map(path => {
        return path.url
    })
})
const urls = pickUrl.reduce((acc,currt) => {
    return acc.concat(currt);
},[])
```
### 2、对象key,value的操作
```js
const obj = {
    name: 'Bob',
    age: 11,
    like: 'eat'
}
const objKeyArr = Object.keys(obj); // ['name', 'age', 'like'];
const objValueArr = Object.values(obj); // ['Bob', 11, 'eat'];
```
