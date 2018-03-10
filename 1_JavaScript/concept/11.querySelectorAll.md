`querySelectorAll()`方法返回的是一个 `Nodelist` 类数组，除了有 `length` 属性和通过 `index` 访问其中元素的方法外，其他数组的实例方法都没有。   

但实际不然，在chrome和firefox等浏览器中可以使用 `forEach()` 方法，但IE中不行。   

为考虑兼容性，不能直接对 `querySelectorAll()` 返回的数据使用数组实例方法。   
