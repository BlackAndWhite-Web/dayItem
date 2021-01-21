## vue底层实现
![](https://user-gold-cdn.xitu.io/2020/3/18/170ed540c31092bf?w=1200&h=750&f=jpeg&s=46721)

### 响应式原理
- 在_init的时候去给data每一个属性用Object.defineProerty去设定的setter和getter;
- Object.defineProperty对每一个属性进行遍历，对数组也不大友好；vue3使用proxy来对属性进行get,set;

### watcher & 依赖收集
- render function 会对所有变量touch，会记录component对该属性的的get； 
- 抽象了一层watcher来绑定组件，记录在get到变量所推进去的队列里面；来用做组件的一个更新操作处理，在set的时候触发组件的update;
- 属性在Object.defineProperty的get时，会进行依赖收集，存放 Watcher 对象的实例;
- watcher目前收集一个依赖的引用关系，当set的时候，就统一去update;
```js
// Dep 维护依赖收集相关的subs,还有触发的notify;
class Dep {
    constructor() {
        this.subs = []
    }
    add(sub) {
        this.subs.push(sub);
    }
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

// Watcher 每一个vue实例组件都会对应一个watcher实例，用来记录touch过的数据属性，在属性set的时候，通知watcher去update 组件；
let uid = 0; // uid for batching
class Watcher {
    constructor() {
        this.id == uid++;
    }
    update() {
        // todo update something 
    }
}

```

### update
- update 组件会进行一个patch操作，patch的核心是diff算法；
- patch里面是一些diff操作，同层比较；去比对，然后更新最少的节点，优化性能；

### nextTick
- 异步操作维护在宏任务和微任务中，event loop来循环这些需要更新的操作；
- 同一个组件多次触发异步更新，给watcher进行了一个id的编号；Vue 在更新 DOM 时是异步执行，会推入一个另外的队列中去执行;
- set: 触发更新， 会将每次触发的行为给watcher标注一个类属性id;同样的update多次触发，只会推入update一次；
- this.$nextTick(callback)拿到更新以后的回调；


### template模板compile流程
```js
//  template
<div>
    <header>
        <h1>I'm a template!</h1>
    </header>
    <p v-if="message">{{ message }}</p>
    <p v-else>No message.</p>
</div>
```
#### parse(解析): 编译成抽象语法书 AST；
![](https://user-gold-cdn.xitu.io/2020/3/18/170ed540d0bb9811?w=2862&h=1438&f=jpeg&s=238028)
#### optimize(优化): 标记一些静态节点；如一些写死数据的节点；会给静态节点做标记；
```js
//  static function
_m(0): function anonymous(
) {
  with(this){return _c('header',[_c('h1',[_v("I'm a template!")])])}
}

```
#### generate(组成): 将AST 转为render function
```js
// render
function anonymous(
) {
  with(this){return _c('div',[_m(0),(message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])])}
}
```

### todo
- vue的响应式原理，如何修改data，模板就会自动渲染；
在init某个生命周期，会把所有的data给Object.defineProperty(); get和set操作；当我们修改data,触发set,$update,抽象了一个watch的概念，会同步更新所有的组件；
- Object对数组不友好的hook;
- 模板 -> AST -> renderTree -> DOM节点过程；
- diff操作
- nextTick;
- watch概念

### 参考：
- [剖析 Vue.js 内部运行机制](https://juejin.im/book/6844733705089449991)