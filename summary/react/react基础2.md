## React实现一个tab切换组件

### 组件数据模型
    采用扁平的展示tab选型卡，及其对应选项卡的对应内容
```
    title:{title_a,title_b,title_c}
    content:{content_A,content_B,content_C}
```

优点：这样的好处是可以配置tab中，title，cotent的内容，使得组件更加灵活

### 实现方式
    基于这种数据模型考虑
    使用包裹的形式创建组件
    可以通过React.Children.map(this.props.children,function(item){}),来获取元素的子元素
```
    <TabComponent>
        <Tab name="red">
            <div className="red">我是红色的标签页</div>
        </Tab>
        <Tab name="blue">
            <div className="blue">我是蓝色的标签页</div>
        </Tab>
        <Tab name="yellow">
            <div className="yellow">我是黄色的标签页</div>
        </Tab>
    </TabComponent>
```
### FAQ
#### 创建一个组件的几种方式的对比
- createClass
ES5创建组件的方法，注意点是在createClass中，React对属性中的所有函数都进行了this绑定，所有不用再手动绑定，并且getInitialState里面初始化state
- class A extend React.Component()
ES6的写法，里面的函数并不会被做绑定处理，需要手动bind;并且state初始化需要在构造函数中定义
- const Button = function A(){}
一般组件只涉及到展示，不设置交互，可以采用这样实现组件的方式，不用关注生命钩子及其状态，所以简洁

#### 箭头函数中this的指向问题
箭头函数的this，箭头函数不会创建自己的this；它指向定义箭头函数的对象。因为箭头函数的实现中就已经做了bind，所以就算不指定this指向，也会指向其定义的对象

#### React.Children api的功能？
React.Children 提供了处理 this.props.children 这个不透明数据结构的工具