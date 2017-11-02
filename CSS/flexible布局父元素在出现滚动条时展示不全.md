父元素flex布局，如果不设置宽度，默认宽度为100%。而子元素设置顶宽w，当viewport的宽度小于w时，自元素会超出父元素box，同时滑动滚动条父元素展示不全。

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
  </style>
</head>
<body>
  <div class="parent">
    parent
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
