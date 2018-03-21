浏览器有一种默认行为：当 input 的 type 为 password 时，它对应的上面一个 input 框会自动填充用户名。   

但有时候我们不需要这种行为，比如我们在支付页面，第一个input需要填写支付金额，第二个弹框需要填写密码，那么第一个输入框就会填写注册的用户名，现在一般注册都是用手机，那涉及的金额就是11位数字，这体验显然不好。   

最简单的方法时在 input type 为 password 时添加 `autocomplete` 属性：   

```html
<input type="password" placeholder="请输入密码" autocomplete="new-password">
```

> chrome, safari, firefox 测试OK 2017-11-17

[Disabling Chrome Autofill](https://stackoverflow.com/questions/15738259/disabling-chrome-autofill)   