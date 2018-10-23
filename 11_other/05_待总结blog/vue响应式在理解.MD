data 格式是这样的：

```js
dialogEdit: {
  tmpBannerTemplate: {
  },
},
```

其中 view 中需要响应式获取 `dialogEdit.tmpBannerTemplate.imgList` 直接再对象上添加属性，是支持响应式的，并且，数组里面对象元素也是响应式的。但下面写法就杯具了：

```js
// 神奇的写法
this.dialogEdit.tmpBannerTemplate = JSON.parse(JSON.stringify(row))

// imgList 非响应式
this.dialogEdit.tmpBannerTemplate.imgList = row.imgList = [{ name: row.resource, url: row.resource }]
```

上面写法导致 imgList 不是响应式了，但更神奇的是，下面的写法就是响应式了：

```js
// imgList 响应式
this.dialogEdit.tmpBannerTemplate.imgList = row.imgList = [{ name: row.resource, url: row.resource }]

// 神奇的写法
this.dialogEdit.tmpBannerTemplate = JSON.parse(JSON.stringify(row))
```

待填坑
