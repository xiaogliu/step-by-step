这篇文章 [前端：你要懂的单页面应用和多页面应用](https://juejin.im/post/5a0ea4ec6fb9a0450407725c) 讲的很好，下面是基本是对这篇文章的复制：

## 单页面应用（SinglePage Web Application，SPA）

只有一张 Web 页面的应用，是一种从 Web 服务器加载的富客户端，单页面跳转仅刷新局部资源（一般以组件的形式出现） ，公共资源(js、css 等)仅在最开始加载时加载一次，常见结构如下：

![spa](https://user-gold-cdn.xitu.io/2017/11/17/15fc93562b418a6e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

比如[榄盛金融官网](https://www.lansheng8.com/)，使用 vue 编写。交互上最直观的特点跳转某个页面的时候公共元素，比如 header 和 footer 不会重新加载（不会闪一下）。

## 多页面应用（MultiPage Application，MPA）

多页面跳转刷新所有资源，每个公共资源(js、css 等)需选择性重新加载，常见结构如下：

![mpa](https://user-gold-cdn.xitu.io/2017/11/17/15fc93684b5f10e1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

比如[智互联官网](http://www.zhilinktech.com/)，传统多页面网站。交互上最直观的特点跳转某个页面的时候公共元素，比如 header 和 footer 需要重新加载（会闪一下）。

## 详细对比

|                   | 单页面应用（SinglePage Web Application，SPA）                            | 多页面应用（MultiPage Application，MPA）     |
| ----------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| 组成              | 一个外壳页面和多个页面片段组成                                           | 多个完整页面构成                             |
| 资源共用(css,js)  | 共用，只需在外壳部分加载                                                 | 不共用，每个页面都需要加载                   |
| url 模式          | a.com/#/pageone，a.com/#/pagetwo                                         | a.com/pageone.html，a.com/pagetwo.html       |
| 刷新方式          | 页面局部刷新或更改                                                       | 整页刷新（如果跳转新页面）                   |
| 数据传递          | 容易                                                                     | 依赖 url 传参、或者 cookie 、localStorage 等 |
| 转场动画          | 容易实现                                                                 | 无法实现                                     |
| 搜索引擎优化(SEO) | 需要单独方案、实现较为困难、不利于 SEO 检索，可利用服务器端渲染(SSR)优化 | 实现方法简易                                 |
| 开发方式          | 常需借助专业的框架（vue，react，angular 等）                             | 直接写单个页面，重复代码多                   |
| 用户体验          | 页面片段间的切换快，用户体验良好                                         | 页面切换加载缓慢，流畅度不够，用户体验比较差 |
