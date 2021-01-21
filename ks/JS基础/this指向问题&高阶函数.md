## this指向问题；
### ES5中 this永远指向最后调用它的那个对象；
```js
var name = "window";
var a = {
    name : null,
    fn : function () {
        console.log(this.name); 
    }
}
var f = a.fn;
f(); // console.log(window);
```
### ES6中 箭头函数的指向；
- 箭头函数本身没有this对象，会引用外层函数或者对象的作用域。
- 箭头函数本身没有this对象，会沿着作用域链去查找this绑定的对象；是基于作用域链去找this对象;
- 箭头函数本身没有this对象，所以谈不上用call,apply,bind来改变this指向；
```js
const name = 'window';
function out() {
    setTimeout(()=> {console.log(this.name)});
}
const obj = {
    name: 'hhhh'
};
out.apply(obj);
```

### 匿名函数的指向；
匿名函数的指向window，在严格模式下会指向undfind;
```js
function out() {
    setTimeout(function() {
        console.log(this) // this指向window,非严格模式；
    },50)
}
```
### this这个对象
调用函数时允许不同的上下文进行复用函数，每个函数被调用时都会获取到两个特殊的变量this,arguments;

### 作用域链&闭包
- 每个函数执行都有个上下文，上下文保存着函数执行保存的变量等信息；
- 作用域链包装对执行环境有权的访问和变动的有序获取；
- 变量对象VO存储：形参/变量/函数声明；

### 构造函数
- 实例化构造函数可以创建对象
- 构造函数的this指向的是实例化构造函数自己

## 高阶组件的学习；
    有函数作为参数输入或者函数作为输出产出；
### 函数作为输入
```js
const arr = [1,2,3];
arr.map((item) => item +1);
```
### 函数作为输出
```js
const isType = (type) => (obj) => {
    return Object.prototype.toString.call(obj) === '[Object ' + type + ']';
}
isType('String')('111'); // true;
```
