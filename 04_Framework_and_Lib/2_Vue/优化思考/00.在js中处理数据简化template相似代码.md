### `v-show` 渲染优化

在模版中经常会通过 `v-show` 展示不同内容，但要注意避免滥用，能合并的还是要合并，比如通过切换 tab 展示不同内容，有下面两种实现思路：   

1. 在模版中通过判断 tab 下子内容的不同，配合 `v-show` 展示，比如：   

```html
<div v-show="tab1">
  <!-- 相似代码 -->
</div>
<div v-show="tab2">
  <!-- 相似代码 -->
</div>
<div v-show="tab3">
  <!-- 相似代码 -->
</div>
```

这种模式直接在 js 代码中获取 tab 的内容，js 中虽然简单，但模版可能有很多重复代码。

2. 在 js 中处理数据，模版中只写一次 `v-show`   

```html
<!-- template -->
<div v-show="tab">
  <!-- 相似代码 -->
</div>
```

```js
// script
if ( condition ) {
  tab = tab[n];
}
```

通过在 js 中处理数据，这样可以简化模版中相似度高的代码

