## Vue VS React
### 第一点——运行时性能
- vue有天然的依赖收集
- react中对一些重新渲染的优化需要开发者手动关心(PureComponent shouldComponentUpdate)，vue下沉到框架实现；

### 第二点——模板语法
- react JSX
- vue 类似于HTML的一套模板；
- DSL模板语法的scope是和js分离的，而且做不了一些JS操作，没有JSX灵活；

### 第三点——脚手架 ？
- react 脚手架create-react-app生成项目想额外加一些配置，有一些局限性
- vue cli运行时可以通过配置插件，进行扩展；

### 参考链接
![](https://cn.vuejs.org/v2/guide/comparison.html#HTML-amp-CSS)