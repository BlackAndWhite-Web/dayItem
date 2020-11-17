## 前端路由
故事线： AJAX -> 交互无刷新加载 -> 路由也无刷新切换加载

后端路由： url -> 后端html资源
    优点： 安全，利于SEO；
    缺点： 加大服务器压力，代码冗余，不利于用户体验
前端路由： 无状态刷新局部页面，得以广泛应用的是SPA，单页应用；


## 实现前端路由的两种方式
### hash
- hashChange
### html5 API
- 后端需要配合支持请求所有的url，返回html;
- pushState replaceState

## 前端路由权限
- 定义权限
- 路由加载里面 拿到用户自身权限和路由权限比对 做是否加载的一个比较;
- 权限路由的动态加载

借助了vuex， 
判断存在权限就router.addRoutes(router)

## vue-router源码初探
- Vue.use() 
- Vue.mixin() 混入所有的组件实例，做合并处理；


## 问题 
- vue-router 中的next是啥理！