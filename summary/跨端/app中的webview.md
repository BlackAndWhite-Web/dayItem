## app中的webview
### 安卓webview

其是基于webkit引擎、展现web页面的控件，webview在低版本和高版本中都采用了不同的webkit版本内核,4.4后直接使用了Chrome。其控件是渲染引擎和JS引擎的组合。

[官方说明](https://developer.android.com/reference/android/webkit/WebView)

> A View that displays web pages.WebView objects allow you to display web content as part of your activity layout, but lack some of the features of fully-developed browsers. A WebView is useful when you need increased control over the UI and advanced configuration options that will allow you to embed web pages in a specially-designed environment for your app.

### IOS webview
ios中的webview是一个允许嵌入网页展示的控件，采用webkit是渲染引擎。早期有UIWebView,ios8以后就出现新的WKWebView控件，WKWebView控件逐步取代了早期笨重的UIWebView.

[官方说明](https://developer.apple.com/documentation/uikit/uiwebview)

> A view that embeds web content in your app. In apps that run in iOS 8 and later, use the WKWebView class instead of using UIWebView. Additionally, consider setting the WKPreferences property javaScriptEnabled to false if you render files that are not supposed to run JavaScript.

#### 总结

其应用app中的webview就是渲染引擎+js引擎封装的一个组件去加载网页，ios和安卓app中浏览器内核不一致，不同的app也可以封装组件的webview组件，或者使用第三方库的webview组件。因为使用的浏览器内核（渲染引擎）不一致，所以app的webview在渲染时和网页也有所不一。

### 浏览器渲染引擎
作为前端开发人员来说，天天与浏览器打交道，下面一张来自网络的图片介绍一下浏览器的构造

![浏览器构造](http://edu-image.nosdn.127.net/f11a522d-74b6-4ab4-858a-db2f544caf7b.png?imageView&quality=100)

* **User Interface** 用户界面，除窗口顶部一些导航，前进后退箭头，书签，刷新等界面。
* **Broser engine** 浏览器引擎，其既是渲染引擎用户界面的中间件，有可以控制浏览器本地存储等
* **Rendering engine** 渲染引擎,也是常说的浏览器内核中的一部分，渲染DOM树和渲染CSS等
* **Networking** 完成网络调用的各模块
* **JavaScript Interperter** js解释器，用来解析js
* **UI backend** 浏览器绘制的一些基本控件，如alert,输入框等；
* **Data Persistence** 浏览器存储的cookie,localStroge等数据

#### 渲染引擎
目前市面上的渲染引擎主要有Trident、Gecko、Presto、Webkit、Blink。IE浏览器的渲染引擎就是Trident，但是一些浏览器为了提高性能采用多核，
**如QQ浏览器：** Trident+ Webkit（Blink）

### webview渲染的问题
因为渲染引擎和所处环境的不同，webview中的页面和H5的页面也有所差异，就会导致开发中一些坑的产生。下面列举出一些场景分享，避免入坑。

#### 安卓中的`<input type='file' />`
在安卓上不支持`<input type='file' ／>`的上传,原因是安卓系统不支持该上传方式，原因是安卓的webview考虑安全性因素，限制了该操作.

**解决方案：** 安卓系统手动支持

#### 安卓中的canvas渲染
在渲染canvas的时候，canvas的渲染时机和webview的渲染时机不好控制，导致webview的onPageFinished方法结束，canvas还没渲染完。

**解决方案：** 这种webview中渲染第三方组件等时，把握不了webview渲染，和canvas渲染。所以我们可以延迟canvas的渲染，在setTimeOut中延迟渲染

#### 安卓中的`<table>`元素
在一些安卓机型上，强制把`<table>`中tr和th换行展示，使得元素错乱。

#### IOS中的fixed布局
IOS中对`position:fixed`的支持不是很友好，页面中设置了`position:fixed`,会使得footer或者其他元素错位或者消失，闪动

**解决方案：** 换布局方案，如果非要使用fixed定位，使得页面布局在调整。

#### 安卓和IOS对相对路径的解析
前端在跳转链接的时候，为了支持动态协议，会使得协议名不指定，写成//的形式，比如’https://www.baidu.com‘ => '//www.baidu.com'
但是webview在解析动态协议路径的时候会不能自动识别其域名的协议。

**解决方案：** 写死协议做调整链接

### webview中的调试
#### 使用alert调试
> 前提：移动端给的安卓包中开启了允许alert()调试

将关键数据装载到alert中弹出看实现效果

#### 移动端开启debug包
让移动端开启debug调试包提供给前端

#### chanels代理抓包
chanels抓包看请求资源，返回和请求字段情况，**注意如果是https的还要装ssl证书**
#### IOS+safari
如果是IOS可以使用IOS+safari调试页面
#### 安卓 chorme://inspect
如果是安卓可以使用chorme://inspect调试页面
