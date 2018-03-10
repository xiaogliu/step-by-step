vue 中无法在 DOM 0 级事件上绑定方法？   

```js
<input type="text" placeholder="test onkeyup" v-on:click="testOnKeyUp()">
```

这样在 methods 中定义 `testOnKeyUp` 是可以正常访问的。但像下面这样就不行：   

```js
<input type="text" placeholder="test onkeyup" onclick="testOnKeyUp()">
```

即便在 methods 中定义 methods 中定义 `testOnKeyUp`，依然提示 `testOnKeyUp` 未定义，为什么？
