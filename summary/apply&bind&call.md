# call,apply,bind
```js
const person = {
    name: 'Bob',
    sayName: function() {
        console.log(this.name,...arguments);
    }
};

const person2 = {
    name: 'Mary'
}
```
## 1、call,apply的区别是什么
这两个都用于改变函数作用域，第一个参数都是用于改变函数体的this指向，不同在第二个参数：call传入的参数是一个一个的；apply，传入的参数是一个数组；
```js
person.sayName.call(person2, 'eat','sleep');
person.sayName.apply(person2, ['eat','sleep']);
```

## 2、call，apply的哪个性能好一些
如上面第一点区别可以看到，call传入的参数是格式更符合函数的解析；apply传入的参数还需要进一步解析；所以call的性能更好一些。
- 在loadsh这些库中，都推荐使用call;
- es6支持解构数组，...arguments;所以用call也能代替apply

## 3、 手写call,apply,bind;

### call
```person.sayName.call(person2, 'eat','sleep');```

原理：用call函数改变this的指向，其实就是person2中是否有sayName,如果没有sayName,就手动绑定一个sayName的属性,去调用；person2.sayName();
```js
Function.prototype.myCall = function(context) {
    context = context || window;
    // this就是person.sayName，拿到person.sayName函数；
    context.fn = this;
    // 拿到剩余参数，如：'eat','sleep';
    const args = [...arguments].slice(1);
    context.fn(...args);
    delete context.fn
}
person.sayName.myCall(person2,'eat','sleep'); 
// Mary ,eat, sleep
```
### Apply
apply和call差不多实现，只要注意第二个参数是数组传入
```js
Function.prototype.myApply = function(context) {
    context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    context.fn(args);
    delete context.fn
}
```

### Bind
bind是返回改变作用域后函数的handle,所以return的是一个函数，但是要注意一个```args.concat(newArgs)```两次参数的一个拼装处理，底层还是调用了apply的实现
```js
Function.prototype.myBind = function(context) {
    const _self = this;
    const args = [...arguments].slice(1);
    return function() {
        const newArgs = [...arguments];
        return _self.apply(context, args.concat(newArgs))
    }

}
```