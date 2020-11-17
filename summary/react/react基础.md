### 模板语法和渲染
采用JSX（js扩展语法,可以用HTML语法格式写在js中），并采用babel将JSX渲染成js。
react中使用render函数以声明式的方式创建一个组件

解析规则：当遇到"<"，就已html的格式解析；当遇到"{"就已js的格式解析,
解析原理：在ReactDOM.render的时候是创建虚拟DOM结构，然后插入某个节点，成为真正的DOM结构

### 组件实现
可以采用函数式组件或者类组件定义一个组件
```
<!-- 函数式组件 -->
function Welcome(props) {
    return <h1>hello {props.name}</h1>
}

<!-- 类组件 -->
class Welcome extends React.Component {
    render () {
        return <h1>hello {props.name}</h1>
    }
}

var element = <Welcome name={'haha'}/>
ReactDOM.render(
    element,
    document.getElementById('example')
)
```
注：类组件和函数式组件的区别是：类组件可以添加本地状态和生命钩子

### props
- 组件中的props外界传入是组件的属性，数据流是自上而下，不可变，与实例化组件中传入的值一一对应，如：props = {name:'haha'};除了props.children 表示组件的子元素

### state状态
1. 不能修改status状态，需要修改调用setState()；
2. 组件自己的状态，一般与用户交互相关，可变

### style
react中style是一个样式对象，所以在写行样式

    <div style={{color:'red'}}>111</div>

### createClass的属性
- propTypes: prop属性的设置要求
- getDefaultProps:prop某个属性的默认值
- getInitialState:读取设置组件初始状态
- 各个生命周期

### 生命钩子
1. componentWillMount() 将挂载阶段
2. componentDidMount() 已挂载阶段
3. componentWillUpdate() 将重新渲染
4. componentDidUpdate() 已重新渲染
5. componentWillUnmount（）卸载阶段
...

#### 组件划分的原则：
1. 组件需要被复用
2. 组件内部足够复杂

### 注意的点
1. props是不能被修改,需要修改的属性定义在state上
2. 列表时调用map需要定义key

