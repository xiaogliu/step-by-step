computed 是属于 vue 实例的一个属性，可以把它理解为 vue 中定义对象的访问器属性的一个语法糖。computed 属性自身作为一个对象，其自身包含的属性都属于访问器属性，其中的 setter 和 getter 函数中的 this 上下文自动绑定为 vue 实例。默认是仅调用 getter 函数（已使用语法糖包好）。

```js
var vm = new Vue({
  data: {
    a: 1,
  },
  computed: {
    // 默认仅读取，即调用get函数，但不需要显式的写get
    aDouble () {
      return this.a * 2;
    },
    // 读取和设置
    aPlus: {
      get () {
        return this.a + 1;
      },
      set (v) {
        this.a += v;
      },
    },
  },
});

vm.aPlus; // 2
vm.aPlus(2); // 4
vm.aDouble; // 8
```

> 注意，计算属性的属性值默认值虽然写成 function 形式，但其本身并不是函数，如果这样用报错 `vm.aDouble()`
