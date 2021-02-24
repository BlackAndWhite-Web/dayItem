## react JSX语法
react采用JSX语法：
- 表达式：大括号中可以放任何表达式,包括“&& ||”的表达式做条件渲染；
- 事件：JSX中的事件绑定的回调是一个函数；
- 列表渲染：list.map等；采用数组的一些迭代方法来渲染和处理列表；
```js
function Count(name, count) {
    return (
        <div>
            <div>{ name }</div>
            <button onClick={() => { count++ }}>{ count }</button>
        </div>
    )
}
```

## 受控组件和非受控组件
> 组件内部的状态是否可以被外部修改；
受控组件：一些表单组件，有value值，然后会被修改，都是由state来控制这个组件的value；
非受控组件：不能控制组件的状态；
[受控组件与非受控组件](https://www.yuque.com/ant-design/course/goozth)

> 非受控组件，如果想获取到组件内部的数据，可以使用ref;

## react合成事件
> 为什么要由合成事件
- 不同浏览器对事件的机制是不一样的，统一浏览器的兼容性；
- 将事件触发都代理到了document上，减小内存销毁，提升性能；
- 兼容各个平台；

> react中的合成事件是怎么样实现的。
- 将所有的事件都注册在document上面；
- 事件触发的时候由一个dispatchEvent的机制来管理所有的事件触发；

> 合成事件和原生事件有什么区别
- 事件触发不是在原生的DOM节点上面；
- 生成的事件对象是合成的事件对象，可以通过nativeEvent访问原生的事件对象；

## 列表key的唯一性的原因，加key的原因
> 主要涉及到的地方是diff算法的时期，可以高度复用DOM节点；同层进行比较；

[人人都能读懂的react源码解析](https://xiaochen1024.com/article_item/600acd10245877002ed5df03)


## virtul DOM diff
> 为什么要有virtul DOM;
真实的DOM结构，属性等繁多，如果直接操作，复杂性，易错性比较大，影响性能

> 什么是virtul DOM;
用js对象抽象出的Tree来描述，真实DOM节点的结构；

- virtul DOM diff流程；
新树，老树，对比两颗树，找到patch,然后将差异更新到新树上面去;

疑问：
- 找出差异是进行局部的一个patch更新；
- diff的一个同层比较，为什么不存在跨层比较；时间复杂度o(3)？

[深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)