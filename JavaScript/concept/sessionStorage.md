`sessionStorage`，H5新增特性，当浏览器当前tab关闭（极端情况是浏览器直接关闭），`sessionStorage`自动清除（会话结束）。是比较`localStorage`没有过期时间。   

## 有什么用

可以存储信息，然后使用，比如用户ID，使用起来还是很方便，试看下面代码   

```js
let id = sessionStorage.getItem('UserID'); // 从sessionStorage中获取用户ID
let res = await requests.user_get(id); // 作用接口入参传入
```

## 语法   

- 设置

```js
sessionStorage.setItem('key', 'value');
```

- 获取

```js
sessionStorage.getItem('key');
```

- 删除特定key

```js
sessionStorage.removeItem('key');
```

- 删除所有key

```js
sessionStorage.clear();
```

> 当退出当前账号时，需要手动清除所有key，不然tab不关闭的情况下，`sessionStorage`中的信息依然存在

```js
// 退出
logout () {
	sessionStorage.clear();
	// 其他操作
}
```

- 其他

`sessionStorage`有`length`属性，表示有多少个`key`。

