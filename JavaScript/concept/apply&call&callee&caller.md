- `apply()`, `call()`在编写代码中经常使用，主要是指定 `this` 执行（或者说指定函数的执行环境）。比如：

```js
// 未绑定执行环境，后续要每次显示指定
const getId = document.getElementById;

// 使用apply时，传参必须为数组，即便只有一个参数，这个时候用call显然更合适
const testBind = getId.apply(document, ['id']);
const testBind = getId.call(document, `id`);
```

> 关于指定 `this` 指向再理解
 
- 除了指定 `this` 指向，有时是为了更方便转化参数，比如： `Math.max()`不能接收数组作为参数，为了能够直接处理数组，可以使用 `apply`

```js
const arr = [1, 3, 4]
Math.max.apply(Math, arr);
```

- `callee`， `caller`

`callee` 是 `arguments` 对象的一个属性，代表 `arguments` 对象指向的函数，这是在解耦的过程，典型应用是用在递归函数中，这样即便函数名 `factorial` 更改，函数体内的代码不需要同步更改。

```js
function factorial(num){
  if (num <=1) {
    return 1;
  } else {
    return num * arguments.callee(num-1)
  }
}
```
