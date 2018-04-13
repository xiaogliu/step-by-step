现有全屏滚动，比如原生 JS 实现全屏滚动

## 使用方法

### 1） 创建 html，结构如下

```html
<div id="pureFullPage">
  <div class="page"></div>
  <div class="page"></div>
  <div class="page"></div>
</div>
```

其中，id 为 `pureFullPage` 的 div 是所有滚动页面的容器，class 为 `page` 的 div 为具体页面的容器。

页面容器 id 必须为 `pureFullPage`，具体页面 class 必须包含 `page`，因为 css 会根据 `#pureFullPage` 和 `.page` 设置样式。

### 2）引入 pureFullPage 的 css 文件

在 html 文件头部添加下面代码

```html
<link rel="stylesheet" href="./css/pureFullPage.css">
```

### 3）引入 pureFullPage 的 js 文件

**这里需要注意**，因为本例采用了 ES6 语法，所以不需要在 html 文件中直接引入 `pureFullPage.js`，只需要引入入口文件（本例中是 `index.js`），在入口文件中通过 `import` 引入 `pureFullPage.js`。

* 在 html 中引入入口文件

```html
<!-- 本例中入口文件是 index.js -->
<script type="module" src="./js/index.js"></script>
```

这里要注意，chrome 现在原生支持 ES module 语法，但需要注明 `type="module"`

* 在 `index.js` 中引入 `pureFullPage.js` ，创建并初始化实例

```js
// 引入 pureFullPage.js
import PureFullPage from './components/pureFullPage.js';

// 创建实例时，把页面容器 id 作为参数传入
new PureFullPage('#pureFullPage')._init();
```

### 4）运行

不同于普通脚本，ES6 模块脚本遵循同源策略，所以不能在跨域请求时（如果没有设置 CORS header）或者本地文件系统使用，请在本地服务器中运行本例中的 demo。

## 了解更多

可查看这篇文章查看详细开发过程（待补充）

## TODO

1.  详细介绍文章；
2.  更多参数配置；
3.  npm package；
4.  英文版说明；
5.  手机支持（主要是触屏事件）。

## 参考资料

[纯 JS 全屏滚动 / 整屏翻页](https://blog.csdn.net/tangdou5682/article/details/52351404)
