## 背景
因为tslint官方表示，已经停止对tslint的维护，推荐大家使用eslint，所以我们慢慢将工程中的tslint转为eslint。

## 原理
因为eslint编译的AST，和TS编译生成的AST，不同，需要借用 **@typescript-eslint/parser,"@typescript-eslint/eslint-plugin"** ,将两棵AST树进行一个兼容转换，原理如下图；
![](https://note.youdao.com/yws/public/resource/4d110c5a6008eefcef514e8454331400/xmlnote/WEBRESOURCE9ebec3ae2c950d1c69f79c86db9a1afd/21793)

## 接入EsLint
#### 第一步：安装相关依赖和插件
- npm i eslint --save-dev
- npm i typescript --save-dev
- npm i @typescript-eslint/parser --save-dev
- npm i @typescript-eslint/eslint-plugin --save-dev

#### 第二步：配置.eslintrc.js 或者 .eslintrc.json文件
可参考如下配置相关
```js
.eslintrc.js
{
  // 指定解析的parser和plugins
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  // 自定义配置一些规则
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off"
  },
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```
***注意：目前eslint的检查规则都是采用官方推荐的规则进行校验***

#### 第三步：在package.json中配置lint脚本
    "lint": "eslint ./**/*.ts --quiet",
***注意：根据实际业务场景配置，目前配置--quiet参数，只暴露一些error,将warn静默掉，如果想看warn可以把该参数去掉*** 

#### 第四步：删除相关之前tslint相关依赖和配置文件

## vscode安装eslint扩展
安装eslint插件，可以在写代码时，eslint就会对检测出有问题的语法标红处理。

1、打开vscode的配置文件setting.json(通过快捷键（cmd + shift + P）输入settings，可以快速打开)

2、在配置文件中加入下列内容
```
    "eslint.enable": true,
    "eslint.alwaysShowStatus": true,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
   	    {
            "language": "typescript",
        }
    ]
```
       



