## 什么是hooks
hook就是钩子函数

## hooks解决什么问题
- 逻辑状态的共享
- 更符合函数式编程，所有组件都是函数
- 不需要关心this,更聚集业务是实现

## hook和传统组件实现模型对比
> hook的实现组件 = 纯函数 + 业务状态和副作用使用hook;
- hook使得组件可以使用无状态函数来实现，利用useState hook可以对组件状态进行缓存；
- 传统组件的利用对象实例来实现，对象实例有状态的变更引发出一些生命周期。

## hooks的一些特性
### useState
- useState函数入参，该state的初始化值
- useState函数返回值，是一个数组arr, arr[0]表示当前 state; arr[1]更新state的函数
```js
import React, { useState } from 'react';
function Demo() {
    const [count, setCount] = useState(0);
    render (
        <div>
            <div>this count {count}</div>
            <button onClick={() => setCount(count +1)}></button>
        </div>
    )
}
```
### useEffect（可以在函数组件中执行副作用操作）

- useEffect第一个参数传入一个副作用函数，返回一个可选的取消副作用函数；
- useEffect第二个参数支持传入一个数组，支持做比对是否需要更新渲染的性能优化处理;如果不传入，就每次组件渲染就重新执行；
- useEffect中执行一些副作用操作，比如DOM操作，获取数据，取消订阅等
- useEffect会在函数渲染后调用，不用管是刻意去关注生命周期函数
- useEffect支持返回一个函数（清除effect相关副作用函数）
- 每次组件渲染都会去更新和执行effect,减少未处理更新逻辑引起一些不必要Bug；

```js
import React, { useState, useEffect } from 'react';
function Demo() {
    const [count, setCount] = useState(0);
    // useEffect无返回清除函数
    useEffect(() => {
        document.title = count
    }, [count])

    const [isOnline, setOnline] = useState(null);
    // useEffect返回清除副作用函数
    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    })
    render (
        <div>
            <div>this count {count}</div>
            <button onClick={() => setCount(count +1)}></button>
        </div>
    )
}
```

### useContext
> 组件中共享状态的数据放到useContext

```js
const AppContext = React.createContext({});
const App: React.FC = () => {
  const [ show, setShow ] = useState(true);
  return (
    <AppContext.Provider value={{username: '1111'}}>
      <div>
        <Hello />
      </div>
    </AppContext.Provider>
  )
}

const Hello = () => {
  const person: any = useContext(AppContext);
  return (
     <div>dd { person.username }</div>
  )
}
```
### 自定义hooks
- 按照规则使用use开头定义；
- 自定义hooks使得组件之前的状态逻辑可以复用；
- hook的复用，每次使用hooks其state，effect又是独立的，只是重用了逻辑；

```js
const usePerson = (personId) => {
    const [ loading, setLoding ] = useState(false);
    const [ person, setPerson ] = useState({});
    useEffect(() => {
        setPerson({
            name: 'cdscdvd',
            age: 'xxxxx'
        })
    }, [ personId ])
    return [loading, person];
}
```

## 学习的点
- npm 升级某一指定版本 npm update package / npm install package@latest / npm install package@2.1.2
- create-react-app 版本升级不上去，暴力删除 /usr/local/bin中的文件，重新安装；

## 需要去理解的点
- react-script中是如何基于index.html在启动服务的；
- JSX和vue模板，Vistual DOM了解；

>  之前组件时class, 现在function? 
是的
- class, 原型函数；

> useEffect会在每次渲染函数时生成一个新的Effect,也会重新调用,渲染后是一个什么阶段。 
渲染就是指组件的一个调用过程，比如初次渲染&state变更引起的重新渲染过程
- effect和生命周期函数，优化相关

> hook 如何保证其执行顺序,state effect不会乱
只在最顶层使用hook
- hook的复用逻辑是怎么保证逻辑复用，state和effect都是独立的。


## 参考文档
[React Hooks 入门教程](https://www.ruanyifeng.com/blog/2019/09/react-hooks.html)