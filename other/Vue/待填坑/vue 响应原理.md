## 问题描述

通过 index 改变数组中元素的值，template 中没有动态响应，见下：   

```js
this.ticketTemplateArr[index].isShowDetail = false;
```

`ticketTemplateArr` 是一个数组，它的元素都是对象。   

解决方法：在视图中强制刷新：

```html
<div class="recordLine" @click="$forceUpdate()"></div>
```

关键在于 `@click="$forceUpdate()"`。  

更多可参考这篇文章： [[那些關於 Vue 的小細節 ] 為什麼畫面沒有隨資料更新 - Vue 響應式原理（Reactivity）](https://pjchender.blogspot.com/2017/05/vue-vue-reactivity.html)  

## 待填坑

1. 所谓动态响应指的是 js 中数据变了，视图中对应数据跟着变而非 js 中的数据值都不改变。   

2. 对于对象和数组在动态响应中的注意事项还需要再整理，现在一知半解。   

