## mysql常用命令行操作
- 两种方式brew下载&下载安装包安装；
- mysql用户账号密码/数据库账号密码/；
- 可视化数据库操作工具navicat premium;

## node连接常用数据库
- node连接mysql
- node连接moogoDB
- node连接redis

## node的ORM框架——sequelize
- 一个强大的ORM的框架，可以支持mySQL等关系型数据库

[sequelize](https://github.com/demopark/sequelize-docs-Zh-CN)

## node搭建一个小型服务——连接数据库
- egg-mysql或者sequelize 是已经将mysql相关操作进行了封装，暴露出简易的api出来进行操作。
```js
// plugin.js
{
    mysql: {
        enable: true,
        package: 'egg-mysql'
    }
}
// router.js
  router.get('/user/:id', controller.user.info);
// controller
    async info() {
        const { ctx } = this;
        const userId = ctx.params.id;
        const userInfo = await ctx.service.user.find(userId);
        ctx.body = userInfo;
    }
// server
    async find(id) {
        const { app } = this;
        const user = await app.mysql.get('user', {userid : parseInt(id)});
        console.log(user, id);
        return {
            name: user.name,
            age: user.age
        }
    }
```

> controller&&model&&server&&lib层的关联；
controller中处理逻辑，可以使用model,server或者lib作为数据库的交互或者复杂数据的转换；

- 事务

## todo
- mysql的相关简易语法和简易增删查改操作;
- redis,mysql,moogoDB相关的环境安装入门;
