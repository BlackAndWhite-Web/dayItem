### 记录学习一次命令行工具
#### npm link 软链接
```
    $ # 先去到模块目录，把它 link 到全局
    $ cd path/to/my-utils
    $ npm link
    $
    $ # 再去项目目录通过包名来 link
    $ cd path/to/my-project
    $ npm link my-utils
```
1、npm link可以将该模块注册到全局；
2、然后可以使用别名来使用；
3、取消软链接 npm unlink来取消；
- 问题1、链接到全局以后才能调试，命令行工具,只是为了简便操作调试？
- 问题2、链接到全局的链接，怎么去除npm unlink似乎不行

#### 简易linux命令操作
- cd 到指定目录：cd /user
- cd 到根目录： cd ~

#### npm install所用的参数
- npm install module --save(工程依赖的模块，写入dependencies)
- npm install module --save-dev(工程开发依赖模块，写入devDependencies，如单元测试工具等)

https://juejin.im/entry/5999826ff265da2494121209

https://aotu.io/notes/2016/08/09/command-line-development/?o2src=juejin&o2layout=compat