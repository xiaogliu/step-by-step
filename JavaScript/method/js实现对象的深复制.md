在JS中如何将对象A复制给对象B，并没有像基本类型复制那么简单。因为对象属于引用类型，所以在进行复制的时候需要分别讨论，通常说的复制，指的是深复制（deep copy）。再开始接下来的说明之前，首先要明白深复制和浅复制（shallow copy）的概念。

# 深复制和浅复制

以将对象A复制一份给对象B作为例子。

- 浅复制：简单来说就是只把A的指针复制给B，此时A和B指向堆内存中同一个对象，修改其中任何一个另一个也会跟着改变。   
- 深复制：将A指向的堆内存中的对象复制了一份，B指向堆内存中新建的对象。此时A和B是互不相关的两个对象。

常见对象浅复制：

`js`: 直接通过赋值操作符`=`进行的操作

```js
var a = {
  name: "vince", 
  age: '18',
  sayName: function () {
    this.name;
  }
};

var b = a;

a.name = "xiaog";

console.log(b.name); // xiaog
```

`jQuery`: 通过`$.extend()`默认进行的赋值

```js
var a = {name: "vince", age: '18'};

var b = $.extend({}, a);

a.name = "xiaog";

console.log(b.name); // xiaog
```