在 react 中遇到一个问题： 

```js
this.state = {
  date: new Date()
};

// 其他代码

<p>{this.state.date}</p>
```

本来想将 date 直接显示在 DOM 中，结果报错：   

```bash
Objects are not valid as a React child (found: Sat Dec 30 2017 19:46:10 GMT+0800 (HKT)). If you meant to render a collection of children, use an array instead.
```

那么问题来了：   

```js
const a = new Date();

console.log(typeof a);
```

`typeof a` 返回的是 `object`！很好理解啊，**因为是对象的实例**嘛！