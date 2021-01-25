## 线程和进程
- 进程：CPU分配资源和运行的最小单位（比如：火车）
- 线程：CPU调度的最小单位（比如：车厢）

### 1、eventLoop是什么，在定义和实现上面区别
eventLoop其实是一个执行模型，在不同地方有不同实现。
- 浏览器的eventLoop是在html5的规范中定义的，具体实现留给了浏览器厂商；
- NodeJS中的EventLoop是基于libuv实现的

### 为什么需要有eventLoop
因为js是单线程的非阻塞语言。至于非阻塞就是浏览器提供了eventloop调度来实现JS执行时不会阻塞；

### 2、宏任务队列&微任务队列的区别
宏任务队列：setTimeout, setInterval, setImmediate(node)， requestAnimationFrame(浏览器)，I/O, UI rendering(浏览器)；
微任务队列：process.nextTick(node)，Promise, Object.observer; await async

### 3、实现上面区别

浏览器的eventLoop定义了一个微任务队列和宏任务队列，js执行顺序：调用栈中同步代码 => 微任务队列 => 宏任务队列

**注意** 宏任务队列中的任务是每次取出一个执行，如果在执行过程中产生微任务(加入微任务队尾)，在该周期一并执行(执行完该个宏任务，继续执行完微任务队列);

node中的eventLoop定义了2个微任务队列，6个宏任务队列，不同类型的任务会被加在不同队列中
2个微任务队列：Next Tick Queue: 放置process.nextTick的回调任务， Other Micro Queue:放置其他microtask,如Promise;
6个宏任务如下
```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```
- timers：执行setTimeout()和setInterval()回调
- pending callbacks: 执行延迟到下一个循环迭代的I/O回调 ？
- idle, prepare：仅node内部使用
- poll: 获取新的I/O事件，适当的条件下node将阻塞在这里 ？
- check:  setImmediate()的回调
- close callbacks: 一些close的回调，比如：socket.on('close',...)

执行顺序：调用栈中同步代码 => Next Tick微任务队列 => Other Microtask微任务队列 => Timer宏任务队列 => Pending callback宏任务队列 => check 宏任务队列 => close 宏任务队列

**注意1** 不同于浏览器中宏任务执行节奏，node中是会执行相应的队列，全部执行，直到队列为空。在执行宏任务中遇到微任务会放到下一次event loop中，不会打破当前执行节奏。在新的node版本中，修改了这一点，也就是每个宏任务执行完就去执行微任务，与浏览器的模型一致；

**注意2** setTimeout(fn, 0)执行顺序和setImmediate的顺序不一定确定，因为setTimeout的0其实默认的是3,与同步代码的执行情况有关。如果在I/O的回调中，那么setImmediate就在setTimeout前面。

### js中的宏任务&微任务；
浏览器是多线程的，有UI渲染线程，http请求线程，js引擎线程等，js是一门单线程语言，当遇到异步操作时就会被挂起，加入到对应的队列中，一旦当前队列的执行栈为空，event loop就会到任务队列中，执行对应队列的里的任务；在宏任务队列和微任务队列中循环执行；

![](https://user-gold-cdn.xitu.io/2020/3/18/170ed540c33d70e8?w=1118&h=504&f=png&s=173826)

微任务队列
- promise
- MutationObserver
- process.nexTick
- async;await

宏任务队列
- setTimeout
- setInterval
- UI rending
- script


### node中的eventLoop和浏览器中的区别
- node有两个微任务队列(nextTick & other mick)和多个宏任务队列; 早期执行模型不一致，后续和浏览器保持了一致（执行同步代码 => 微任务队列 => 宏任务队列(挨个执行，如果出现微任务，继续去执行微任务后在执行宏任务)）

### 参考
[带你彻底弄懂Event Loop](https://segmentfault.com/a/1190000016278115)