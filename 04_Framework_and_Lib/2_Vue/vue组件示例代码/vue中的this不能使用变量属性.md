可以使用，见下面代码，只是要注意函数传参时传的是变量还是字符串，见下面代码：

```html
<input type="number" v-model="moneyOfThree"  @click="moneyOfThree = ''" @blur="initInput('moneyOfThree')">
```

```js
initInput (money) {
  if (this[money] === '') {
    this[money] = 100;
  }
}
```

如果 `blur` 时传入执行函数的参数变为 `@blur="initInput(moneyOfThree)"`，即不加引号，那 `moneyOfThree` 就是变量，那在 `initInput` 函数中执行肯定不会达到预期效果。
