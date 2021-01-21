- 全局状态管理更优雅

- 获取vuex属性的一个批量获取：mapState；
- 批量更新的方法：包装了一个mapModel的方法，入参属性列表，出参包装后的computed对象
```js
<input v-model="message">

function mapModel(names) {
  return names.reduce((computed, name)=>{
    return {
      ...computed,
      [name]: {
        get () {
          return this.$store.values[name]
        },
        set (value) {
          this.$store.commit('setValues', { name, value })
        }
      }
    }
  }, {})
}
```
- getters: vuex提供的对state进行format的优雅写法；
- 表单处理
    - v-model， value, change;
    - computed来获取和修改；
- 重置vuex属性
    - 封装在action中，在action中去commit resetState;
    - 创建一个生产函数，返回一个全新的默认状态对象；
```js
const getDefaultState = () => {
  return {
    items: [],
    status: 'empty'
  }
}
```


----------------------------------------------------------------
- 状态管理： 将组件的共享状态抽离出来，按照一定的约定，统一管理，让变化变得有记可寻。

- 问题
    - 1.变化追踪；action, mutation，追踪，存储的结构；
    - reducer(纯函数), middleware
    - vuex中重写state, 不能直接对state进行复制，需要做一层赋值，Object.assign(state, xxx)




- todo
eventBus
redux实践；
依赖注入；