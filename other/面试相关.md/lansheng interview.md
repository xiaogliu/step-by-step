## css
1. Position 四个属性及区别；absolute 相对谁定位；relative 相对谁定位
2. 一个 div 画个十字架（伪元素，定位）
3. z-index 失效情况？模态框多、层定位
4. Background 如果是image，当背景图宽度大于显示的宽度时始终显示中间部分
5. flex：值为1什么意思；靠底对齐；列布局
6. 动画使用情况（animation，transition）

## js
1. 数据类型：基本/引用及区别（深浅复制及 vue 中 data 属性在复用组件中的写法）
2. 数组/字符串常用方法使用：字符串反转 `"i am a coder" 变为 "code a am i"`
3. this 指向：下面输出是什么（apply，call 改变执行上下文）
```js
(function () {
  console.log(this);
})()；
```
4. 词法作用域和动态作用域，例题

```js
let a = 2;

function foo() {
  console.log(a); // 会输出2还是3？
}

function bar() {
  let a = 3;
  foo();
}

bar();
```
5. 事件模型，简述，阻止冒泡（vue 中如何阻止），事件委托
6. call，apply 作用及区别（引出问题6）
7. `document.querySelectorAll()` 返回是什么（类数组，如何能使用数组的所有方法）

```js
let domNodes =  Array.prototype.slice.call(document.querySelectorAll(".className"))
```

8. let, const, var区别（块级作用域，临时性死区/不能变量提升，未添加为 window 的属性），工作中最常用哪个
9. 构造函数、原型、实例关系，ES5中如何实现继承；使用 ES6 class 如何定义构造函数、原型方法、实现继承
10. 本地存储（sessionStorage，localStorage，cookie区别），工作中使用
11. 如果有使用 node，hybrid 大概了解下

## vue
1. 父子组件传递数据（props，$emit，如果提及 vuex 问 vuex生命周期，页面硬刷新后变化，如何改变默认生命周期 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)) ）
2. data 两种写法，区别
3. 生命周期，created 和 mounted 区别，什么时候发送网络请求比较好
4. data 动态响应原理（失效情况）
5. vuex生命周期，页面硬刷新后变化，如何改变默认生命周期 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
6. 路由跳转
7. 使用何种方式实现网络请求
8. 有没有遇到组件件样式相互影响，如何解决

## 其他
1. gulp，webpack
2. 代码规范（采用何种规范），ESlint 配置
3. 面试者有什么想问的