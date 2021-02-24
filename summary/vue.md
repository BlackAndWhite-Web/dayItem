## vue的数据驱动流程
### 第一部分 视图模版的渲染编译阶段
![](https://user-gold-cdn.xitu.io/2020/3/18/170ed540c31092bf?w=1200&h=750&f=jpeg&s=46721)

#### template模板compile流程
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
##### parse: 编译成抽象语法书 AST；
![](https://user-gold-cdn.xitu.io/2020/3/18/170ed540d0bb9811?w=2862&h=1438&f=jpeg&s=238028)

##### optimize: 标记一些静态节点；如一些写死数据的节点；会给静态节点做标记；
```js
//  static function
_m(0): function anonymous(
) {
  with(this){return _c('header',[_c('h1',[_v("I'm a template!")])])}
}

```
##### generate: 将AST 转为render function
```js
// render
function anonymous(
) {
  with(this){return _c('div',[_m(0),(message)?_c('p',[_v(_s(message))]):_c('p',[_v("No message.")])])}
}
```

> Template => AST => VDOM => Rend function

### 第二部分 数据驱动和依赖收集
- init(observer所有的data, 做数据的劫持)
- 用一个观察者模式来做数据更新；
- 订阅者
```js
class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    notify() {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}
```
- 观察者类
```js
class  Watcher() {
    constructor() {
        Dep.target = this;
    }
    update() {
        console.log('update');
    }
}
```


### watcher作为compile和observer(Dep)的桥梁
![vue底层示意图](./iamges/vueDataBind.png)
compile以后的render函数中每一个表达式都会生成一个watcher实例；
data中的每一个属性都会生成一个Dep实例；
```js
function defineReactive (obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            dep.addSub(Dep.target);
            return val;         
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            dep.notify();
        }
    });
}
```

## 观察者模式和发布订阅模式
![发布订阅示意图](./images/subModel.jpeg)
- 应用场景
观察者模式：vue数据驱动中的数据更新；
发布订阅者模式：
- 优缺点对比

## 父子组件的生命周期的渲染；
渲染： 父beforeCreated => 父created => 父beforeMounted => 子beforeCreated => 子created => 子beforeMounted => 子mounted => 父mounted
更新： 父beforeUpdate => 子beforeUpdate => 子update => 父update

## DocumentFragment
节点容器，在compile的时候操作DocumentFragement会比DOM速度和性能更好
```js
const dom = NodeToDucument(document.getElementById('aaa'));
NodeToDucument = (dom) => {
    const flag = document.createDocumentFragment();
    let child;
    while(child = dom.firstChild) {
        flag.append(child);
    }
    return flag;
}
document.getElementById('app').appendChild(dom);
```