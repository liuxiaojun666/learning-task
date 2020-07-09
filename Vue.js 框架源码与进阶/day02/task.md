### 选择题
#### 1、下面关于 Vue.js 的数据响应式描述正确的是：(B C D)
A. 任何一个对象都可以被设置为响应式对象，当该对象的数据发生变化后可以通知视图更新。

B. 只有 Vue.js 中的选项 data (如：new Vue({ data: {  } }))才可以设置为响应式对象，当该对象的数据发生变化后通知视图更新。

C. Dep 对象的作用是收集依赖，每一个属性都会对应一个 Dep 对象，当属性变化时会调用 Dep 对象的 notify 方法发送通知更新视图。

D. 1个 Dep 对象可能会对应多个 Watcher 对象，当数据变化触发依赖 Dep 对象通知对应的 Watcher 对象更新视图。

#### 2、下面关于响应式原理描述错误的是：(A B C)
A. 给 data 对象的某个属性设置为一个新的对象 (this.o = { name: 'xxx' })，此对象是响应式的。

B. 点击按钮的时候给 data 对象上的 obj 新增一个 name 属性 (this.obj.name = 'xxx')，该属性是响应式的。

C. Vue.js 内部当数据变化后，直接更新真实 DOM。

D. Vue.js 内部当数据变化后，首先操作的是虚拟 DOM。

### 简答题
#### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。
``` js
let vm = new Vue({
  el: '#el'
  data: {
    o: 'object',
    dog: {}
  },
  method: {
    clickHandler () {
      // 该 name 属性是否是响应式的
      this.dog.name = 'Trump'
    }
  }
})
```
##### 答：

1. 如上代码 clickHandler 函数设置的 this.dog.name 不是响应式的。
2. Vue响应式内部原理为 Vue实例化时遍历 data 对象的属性，把data对象中每一个可枚举属性 用 Object.defineProperty() 方法挂载到 vue实例上，并且修改属性的 get、set 方法。get、set实际处理为 vue实例的$data对象（及data对象）。   实现this.xxx访问data对象属性。

    vue实例 $data 对象同上 为每一个可枚举属性 用 Object.defineProperty() 方法修改属性的get、set方法。

    如果属性值为对象，则把属性值对象也做同样处理。

    被修改过get、set方法的属性在发生变化时，如果新的值为对象类型，则把属性也同样如上设置为响应式属性。然后触发notify(), 更新试图。

    由上可知，响应式数据是在 vue 实例构造函数中注册的。

    如果想要实现 上面代码 设置新成员为响应式 可以 重新复制 dog 属性
