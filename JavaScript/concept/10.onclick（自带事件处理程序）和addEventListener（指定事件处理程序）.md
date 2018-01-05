### onclick
JS中指定时间处理程序的传统方式，是将函数赋值给一个事件处理程序属性。DOM中每个元素都有时间处理程序属性，包括`window`和`document`。比如：   

```js
var btn = document.querySelector('#myBtn');
   
btn.onclick = function () {
	console.log('我被点击了');
}
```

注意点：   

- 此时事件处理程序被认为是元素的方法，事件处理程序是在元素的作用域中执行：  

```js
var btn = document.querySelector('#myBtn');
   
btn.onclick = function () {
	console.log(this.id); // 'myBtn'
}
```

> 实际上在事件处理程序中，可以通过`this`访问元素的任何属性和方法。

- 冒泡阶段处理

- 删除事件处理程序方法：

```js
btn.onclick = null;
```

### addEventListener

`addEventListener`接受三个参数：事件名，作为事件处理程序的函数，一个布尔值。布尔值为`true`表示在时间捕获阶段调用事件处理程序，反之，在事件冒泡阶段处理。一般设为`false`。   

```js
var btn = document.querySelector('#myBtn');
   
btn.addEventListener('click', function () {
	console.log('我被点击了');
}, false);
```

使用`addEventListener`添加事件处理程序不仅可以指定在什么阶段进行处理，更重要的是**它可以给同一个元素添加多个事件处理程序**，根据添加顺序依次执行。   

```js
var btn = document.querySelector('#myBtn');

btn.addEventListener('click', function () {
	console.log('我被点击了');
}, false);
   
btn.addEventListener('click', function () {
	console.log('我又被点击了');
}, false);
```

依次输出：'我被点击了'和'我又被点击了'。   

通过`addEventListener`添加的事件处理程序只能通过`removeEventListener`删除，但注意，如果添加到`addEventListener`中的函数是匿名函数，则无法删除。   

```js
var btn = document.querySelector('#myBtn');
   
btn.addEventListener('click', function () {
	console.log('我被点击了');
}, false);
   
btn.removeEventListener('click', function () {
	console.log('我被点击了');
}, false); // 无效！因为是不同的函数
```

```js
var btn = document.querySelector('#myBtn');
   
btn.addEventListener('click', handlerName, false);
   
btn.removeEventListener('click', handlerName, false); // 有效！因为是同一个函数
```
