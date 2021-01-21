## 关于webview和native的通信
### 业务场景：
    在客户端中有一些页面是非原生页面,是h5实现的webview页面；这样的好处是：

 **从用户的角度出发：** webview注入的页面的修改不依赖于移动端的发版，可以自动更新，不需要用户手动更新客户端版本；
 
 **从开发的角度出发：** 
 对于一些变动大的页面，如活动页面，使用webview开发，可以实现开发一套，运行在多端，开发成本低

    所以实现开发中webview页中存在一些操作需要与客户端交互的场景，比如以下场景：

**a场景:**  A页面是webview,A页面有一个入口需要跳转到客户端原生页面；

**b场景:**  A页面里面有某一个行为，如上传图片，支付，需要调取原生的功能；

### 实现方案：
#### 原始的通信实现：
![图片](http://edu-image.nosdn.127.net/ff16a3754d3541c89a470d9c6a8f580a.jpg?imageView&quality=100)

#### native调用webview
调用window上api；

#### h5调用native：

**1. 有api的注入（api的注入有一定兼容性，和安全性）** :通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法，让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。

**2. 通过URL拦截：**
webview拼装请求url，native拦截到该请求更加其中的参数，执行相关的操作。

#### 封装出一个jsbridge来进行通信
    原理：其底层原理还是依赖粗暴的通信方式来解决，只不过将其封装到一个对象中来优雅解决，利于后期维护。

实现过程：将其通信实现的jsbridge注入到客户端里面,下面就结合代码来解释一下这个jsBridge内部原理；


**其通信的方式有两种：**


a:只需要通知的native；有去无回的；

b:需要通知native，并且需要有回调返回更新h5的，有去有回的。可以成功callback通知到webview实现是类似于jsonp的请求，在url后面携带回调函数和相关参数信息


    ;(function() {
    	if(window.jsbridge) {
    		return;
    	}
    
    	var jsbridge = {};
    	var _callbacks = {}; // 维护callback的回调
    	var _current_id = 0;
    	var CustomProtocolScheme = 'jsonrpc';
        var jsonRPCCall = 'rpccall';
    	var jsonRPCIdTag = 'id';
    
    	function doCall(request,success_cb,error_cb) {
            if (jsonRPCIdTag in request && typeof success_cb !== 'undefined') {
                _callbacks[request.id] = { success_cb: success_cb, error_cb: error_cb }; 
            } 
            // 供native拦截执行相应的逻辑
            nativeExec();
    	}
    
    	// 拼装拦截的url链接
    	function nativeExec() {
    		window.location = CustomProtocolScheme + '://' + jsonRPCCall + '/' + _current_id;
    
    	}
    
    	// 单项通信 -- a类情况	
    	jsbridge.notify = function(method,params) {
    		var request = {
                method  : method, 
                params  : params
    		}
    		doCall(request, null, null);
    	}
    
    	// 双项通信 -- b类情况(带成功和失败的回调，存储至native中)
    	jsbridge.invoke = function(method,params,success_cb,error_cb) {
    		var request = {
                method  : method, 
                params  : params,
                _current_id :_current_id++
    		}
    		doCall(request, success_cb, error_cb);
    	}
    
    	// native处理完逻辑以后，通知h5更新，执行其相关成功失败回调
        jsbridge.onMessage = function(message) {
        	var response = message
            if(typeof response === 'object' && jsonRPCTag in response) {
            	// 成功回调
                if(jsonRPCResultTag in response && _callbacks[response.id]) {
                    var success_cb = _callbacks[response.id].success_cb;
                    delete _callbacks[response.id];
                    success_cb(response.result);
                    return;
                // 失败回调
                } else if(jsonRPCErrorTag in response && _callbacks[response.id]) {
                    var error_cb = _callbacks[response.id].error_cb;
                    delete _callbacks[response.id];
                    error_cb(response.error);
                    return;
                }
            }
        };
    
        window.jsbridge = jsbridge;
    })()