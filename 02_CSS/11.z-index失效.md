如果 `z-index` 设置失效，常见问题如下：   

### 设置 z-index 的元素 position 属性为 static   

想要是 z-index 生效，被设置元素的 position 值不能是 `static`   

### 父元素的 z-index 优先级低于其他元素

如果要将 A 元素的 z-index 设置为高于 B 元素的优先级，那么 A 元素的父元素的 z-index 也要高于 B 元素的 z-index，不然无效。   
