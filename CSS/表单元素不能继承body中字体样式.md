`body`中添加的全局字体样式不能被表单元素继承，需要单独设置样式。   

```css
body {
  margin: 0;
  padding: 0;
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
}

/* 表单元素不能继承body里面设置的字体属性 */
input, label, select, option, textarea, button, fieldset, legend {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
}
```
