## node相关基础
基于v8引擎运行js；事件驱动模型；内置了很多模块，比如：http等；

### node起一个服务
```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('2222')
});
server.listen(3000)
```

## koa相关
封装了node的http server， 完善了request, response, context等对象的一个小型框架；

```js
const Koa = require('koa');
const app = new Koa();
app.use(ctx => {
  ctx.body = '134'
})
app.listen(3000);
```
### Application的封装
- ？application中callback，callBackFn的封装

### koa相关的中间件机制
```js
async function m1(next) {
  console.log(1);
  await next();
}
async function m2(next) {
  console.log(2);
  await next();
}
async function m3(next) {
  console.log(3);
}
let next1 = async function() {
  await m3();
}
let next2 = async function() {
  await m2(next1);
}
m1(next2);
```
> next实际就是一个函数，接下来做抽象的工作

#### 中间件机制——洋葱模型机制

1、在app.use，将各个中间件推出到middlewares里面;

2、洋葱模型的机制实质是剥洋葱模型，采用链式反向递归模型，依次执行每个中间件，当遇到next时，将控制权交给下一个中间件；当遇到最后一个中间件，在递归回来依次执行之前的中间件剩余的逻辑；

3、注意一个context的一个传递；

```js
compose() {
  return async ctx => {
    const createNext = (middleware, oldNext) => {
      return async () => {
        await middleware(ctx, oldNext);
      }
    }
    // 最后一个中间件next设置为一个resolve状态的promise;
    let next = async () => {
      return Promise.resolve();
    }
    // 精华-递归代码， 链式反向递归模型，
    for(let i = len -1; i>=0; i--) {
      let currentMiddleware = this.middleware[i];
      next = createNext(currentMiddleware, next)
    }
    await next();
  }
}
```
## 错误捕获异常
### 中间件中的错误；
> 中间件错误处理可以在第一个中间件中,加try,catch捕获；
```js
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx,next) => {
  try {
    console.log(1222);
    await next()
  } catch(e) {
    console.log(e)
  }
})
app.use((ctx, next) => {
  console.log(2);
  throw new Error('2222');
})
```
> 在Koa中，组合中间件的时候，最后返回的是一个promise,可以加catch捕获；实现onerror的一个回调，并emit出来；供业务在外层on监听完善业务逻辑；
```js
// koa底层实现
onerror(err, ctx) {
    if (err.code === 'ENOENT') {
        ctx.status = 404;
    }
    else {
        ctx.status = 500;
    }
    let msg = err.message || 'Internal error';
    ctx.res.end(msg);
    // 触发error事件
    this.emit('error', err);
}

const Koa = require('koa');
const app = new Koa();
app.use(async (ctx,next) => {
  try {
    console.log(1222);
    await next()
  } catch(e) {
    console.log(e)
  }
})
app.use((ctx, next) => {
  console.log(2);
  throw new Error('2222');
})

app.on('error', (err, ctx) => {
  console.log(err);
  ctx.status = 500;
  let msg = err.message || 'Internal error';
  ctx.res.end(msg);
});

app.listen(3000);
```


### 同步和异步的错误处理
- 错误的处理应该遵循责任链模式，谁的错误，谁处理。
- try catch只能捕获当前调用栈的错误的, 宏任务队列和微任务队列是事件调度器的队列；

```js
function printTime() {
    throw new Error();
}

try {
    //  如果需要捕获错误，就可以在setTimeout中去捕获错误；
    setTimeout(() => {
      try {
        printTime()
      } catch(e) {
        console.log(222)
      }
    }, 1000);
    console.log('done');
} catch (e) {
    console.log('error');
}

```
### Promise的错误处理；
- promise也遵循同步异步错误原则，也可以使用catch来捕获异常
```js
// setTimeout这个错误不能在catch中捕获，因为微任务已经执行完，setTimeout在宏任务中推入栈执行
const a = new Promise((resolve, reject)=> {
  setTimeout(()=> {
    throw new Error(111)
  }, 1000)
  console.log(55555);
})
a.then().catch((e) => {console.log(1111)})

// 这个可以捕获，因为错误，所以promise状态变成了reject,直接走到了catch中的逻辑；
const a = new Promise((resolve, reject)=> {
  throw new Error(111)
  console.log(55555);
})
a.then().catch((e) => {console.log(1111)})
```
### 常见错误处理方式
- throw catch
- callback
- EventEmit


## 参考文档
[从头实现一个koa框架](https://zhuanlan.zhihu.com/p/35040744)

[浅析koa的洋葱模型实现](https://segmentfault.com/a/1190000013981513)

[[译] NodeJS 错误处理最佳实践](https://segmentfault.com/a/1190000002741935)


## koa洋葱模型
概念：洋葱模型的图很具体；
### API
- api: app.use() 添加中间件到应用中
- api：默认执行第一个中间件，如果要执行多个next()函数来调用；
- api: next函数返回的是一个promise;
### 中间件例子
```js
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
    console.log(1)
    await next();
    console.log(5)
    const rt = ctx.response.get('X-Resoponse-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx,next) => {
    const start = Date.now();
    console.log(2)
    await next();
    console.log(4)
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
    console.log(3)
    ctx.body = 'hello world';
})
app.listen(3000);
// console
// GET / - 7ms
// 1
// 2
// 3
// 4
// 5
```
### 为什么要有洋葱模型
- 业务分层处理，合理的架构；
### koa洋葱模型的实现 ——— 源码解析两点：
- middleware是一个队列，收集所有的一个中间件；
- 将context一路传递下去；
- 将middleware下一个中间件的fn作为未来next的返回值；

1、中间件机制，koa的洋葱模型和中间件机制；
2、实践的东西； 造轮子
- 有一个全貌，然后基于全貌去组点攻破；
- 在造轮子中差缺补漏；
- 基本功练（算法 + 面试题）1.5h
- 英语书籍40min
- code + 视频/书籍学习 2h;

算法相关
面试题抽选学习；

vue;
理解当前框架思想；
手写一个vue出来；MVVM的框架
模板到真实DOM;
虚拟DOM；
