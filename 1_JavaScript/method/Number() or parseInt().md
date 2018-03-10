之前字符串转换为数字喜欢用 `parseInt()`，直观上感觉比 `Number()`性能好。

实际不然，性能相近，不过转化逻辑感觉 `Number()`更好，比如表单验证，如果输入非数字，使用 `parseInt()`可能还会转化为数字，而
`Number()`则会转为 `NAN`，通过条件判断符合逻辑，前者则不行，看下面例子：

```js
// 获取用户在input中输入的值是string
let a = '123b';

// 通过parseInt判断错误
if (parseInt(a, 10)) {
  console.log('parseInt: a is a number');
} else {
  console.log('parseInt: a is not a number');
}

// 通过Number判断正确
if (Number(a)) {
  console.log('Number: a is a number');
} else {
  console.log('Number: a is not a number');
}
```

所以，以后字符串转数字，用 `Number()`好了。
