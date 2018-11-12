虽然写的人很多了，但自己还要总结，因为回头看自己写的代码，居然有写看不懂，别人的毕竟不是自己的。

另外，实际使用中也会遇到特别问题，比如，更改 viewport 解决 1px 问题并不是好办法，首先渲染问题，性能开销很大，另外，兼容性也不好，UC 每次刷新都不一样什么鬼！

待总结 blog。

将 html 字号设置为屏幕宽度，然后借助 sass or less 写转换函数。

```less
@function px2rem($px) {
    @return $px/widthOfScreen*10 rem
}
```

这里的关键是 width of screen，一般取 750，这样就可以配合设计稿直接写尺寸了。
