## Promise
### 含义
- promise是对异步的一种解决方案， promise表示承诺，包裹着未来的值(异步的值)；
- promise的实质还是基于回调的方式，只不过处理和写法上更加优雅了


### 使用
```js
// promise里面包裹着异步操作和异步获取的值
const promise = new Promise((resolve, reject)=> {
    // 异步操作
    setTimeout(() => {
        resolve(1);
    }, 100)
})

// then里面是异步成功和失败的回调
promise.then((value)=> {
    console.log(value)
}, (err) => {
    console.log(err)
})
```

### promise封装抽象
```js
class Promise2 {
    constructor(fn) {
        /**
         * 属性定义
         **/  
        this.static = 'PEDDING';
        this.value = undefined;
        this.resolveCallBack = [];
        this.rejectCallback = [];
        /**
         * 内部定义resolve & reject方法
         **/  
        const resolve = (val) => {
            // * input value; output null
            // 1、static的改变
            // 2、value的赋值;
            // 3、resolveCallback回调执行
        }
        const reject = (err) => {
            // * input err; output null
            // 1、static的改变
            // 2、value的赋值;
            // 3、rejectCallback回调执行
        }
        try {
            fn(resolve, reject);
        } catch(e) {
            reject(e)
        }

    }
    /**
     * 原型方法
     **/

    then(resolveCb, rejectCb) {
        // 返回一个新的promise;
        // 管道连接两个promise
        // 往rejectCallbackresolveCallback中推入回调
        return new Promise((resolveNext, rejectNext) => {
            const resolveFn =(value) => {
                // 第一步：判断resolveCb是不是函数;不是函数直接resolveNext(value)
                // 第二步：判断resolveCb(value)执行结果是否是promise,是的话，连接then res.then(resolveNext, rejectNext)
                // 第三步，不是的话，就直接resolveNext(res)
            }
            const rejectFn = (value) => {

            }
        })
    }

    catch() {

    }
    /**
     * 类方法
     **/
    static race(list) {
        // input list; output 最先改变的promise item
    }

    static all(list) {
        // input一个数组(每个值都需要包装成一个promise=> Promise.resolve())
        // output完成了list中所有状态为resolved才返回最后结果的promise; resolve(arr);
    }

    static resolve() {

    }

    static reject() {

    }
}
```

### 理解难点
> 难点1：promise规范

promise本身就是有一套规则存在的，比如异步结果的值就是promise，怎么处理等，是有一套规范存在的；

> 难点2：promise构造函数中，维护了resolve,reject实现；

在promise的使用上面，可以看到实例化promise时传入了一个函数，这个函数有两个参数（resolve, reject）,这两个参数方法的封装，实际就封装在Promise里面；resolve, reject参数就是异步结果;

> 难点3： then方法实现
- then实现链式调用，在链式调用实现的关键就是返回一个新的promise;

- then返回的这个promise,实际就是下一个then中的两个参数(resolveNext, rejectNext)；当前上一个then中（onResolve, onReject),影响下一个promise的结果；传递下去；如果没有return,就返回undefined

- then实际上就是一个管道，一个函数返回一个函数；在链式调用中是一环扣一环的;上一个promise的结果给到下一个promise

- then(()=>{A}, ()=> {B})， 需要对then的参数进行是否是函数的一个判断；如果then 里面返回的也是一个promise，那么就需要用then连接这两个promise;

- then中就是维护成功失败的回调数组内容；

> 难点4: 对执行方法的返回值判断，如果是Promise，用then方法的连接

> 套路： 基本return promise + then;

- promise构造方法中注重异步结果是否是promise;用then链接；

- then中返回promise;注重执行执行回调的结果本身是否是promise;

### 参考链接
[Promise实现原理（附源码）](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)
