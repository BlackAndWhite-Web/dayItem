### 异步实现的方式
- 函数回调
- promise
- await & async

### await & async的原理
- 核心：generator函数 + 自执行器
- generator函数是通过函数指针可以一步步控制执行异步操作；
- 自执行器：采用thunk函数，函数回调当参数传递 & promise来交回控制权给generator； 递归的形式


### todo
- 自执行器的递归调用实践；
- 自执行器函数和generator函数的结合

[ES6 异步](https://es6.ruanyifeng.com/#docs/generator-async#Thunk-%E5%87%BD%E6%95%B0)