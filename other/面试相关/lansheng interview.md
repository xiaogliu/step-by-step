# 面试聊天

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
  "use strict"
  console.log(this);
})();
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

# 笔试

一、CSS

1. CSS 属性 `position` 有哪几个值，各相对于谁定位
2. CSS 属性 `box-sizing` 有哪几个值，各有什么特点
3. 至少写出两种使元素垂直居中的方法，其中一种使用 flex 布局
4. 只使用一个div元素，实现一个“十字架”图形

二、JS

1. 1 - "1" 、1 + "1" 、"1" + 1 的结果分别是什么？
2. 将 "i am a coder" 更改为 "coder a am i"
3. 下面代码输出什么？

```js
var a = 2;

function foo() { 
    console.log( this.a ); 
}

foo();

var obj={ 
    a: 1, 
    foo: foo,
}; 

var bar = obj.foo;

bar(); 

```
4. 问题描述：已知n个人（编号分别以1，2，3…n表示）围坐在一张圆桌周围。编号为 1 的人开始报数，数到 k (k是正整数) 的那个人出列；他的下一个人又从 1 开始报数，数到 k 的那个人又出列。依此规律重复下去，直到圆桌周围只剩下一个人，求该人的编号。

输入：n、k；输出：剩下的最后一人的编号。

三 、其他

1. 简述Vue或者React组件间如何通信
2. 简述 Session、Cookie、SessionStorage、LocalStorage、IndexDB的特点

# JS 第 4 题的一个参考答案：

```js
function LuckyGuy(n, k) {
  let a = [...Array(n + 1).keys()];
  a.shift();
  (function deleteOne(k) {
    console.log(a);
    if (a.length === 1) {
      return console.log(a[0]);
    }
    if (k > n) {
      k = k % n;
    }
    a.splice(k - 1, 1);
    let x = a.splice(0, k - 1);
    a.push(...x);
    n = n - 1;
    deleteOne(k);
  })(k);
};
LuckyGuy(10, 3);
```