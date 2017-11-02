父元素flex布局，如果不设置宽度，默认宽度为100%。而子元素设置顶宽w，当viewport的宽度小于w时，自元素会超出父元素box，同时滑动滚动条父元素展示不全，同时，更要命的是，子元素一般都是有内容的，此时会如果子元素居中显示，则左侧内容不可见。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .parent {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #efefef;
    }
    .child {
      width: 1200px;
      height: 50px;
      margin: 50px 0;
      background-color: green;
    }
    .parent-nonflex {
      margin-top: 20px;
      background-color: #efefef;
    }
  </style>
</head>
<body>
  <div class="parent">
    parent flex layout
    <div class="child">
      child
    </div>
    <div class="child">
      child
    </div>
  </div>
  <div class="parent-nonflex">
    parent non-flex layout
    <div class="child">
      child
    </div>
    <div class="child">
      child
    </div>
  </div>
</body>
</html>
```
