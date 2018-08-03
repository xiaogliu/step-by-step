# 提取数字字符串

getNumberStr(false, 1, 'a', '2', 3, 4, 'b') 结果为 '1,2,3,4'

## 正则

```js
var getNumberStr = (...args) => {
  var tmp = args.filter(e => {
    return /\d/.test(e);
  })

  return tmp.join();
}
```

```js
var getNumberStr = (...args) => args.filter(e => /\d/.test(e)).join();
```

## Number 检验

```js
var getNumberStr = (...args) => args.filter(e => !!Number(e)).join();
```

# 理解的继承

## es5

```js
var Rectangle = function (w, l) {
  this.width = w;
  this.length = l;
}
Rectangle.prototype.getArea = function() {
  return this.width * this.length;
}

var Square = function (w) {
  Rectangle.call(this, w, w);
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    value: Square,
    writable: true,
    configurable: true,
  },
});

var r = new Rectangle(3, 4);
r.getArea();

var s = new Square(3);
s.getArea();
s instanceof Square;
Square.prototype.constructor === Square;
```

## es6

```js
class Rectangle {
  constructor(w, l) {
    this.width = w;
    this.length = l;
  }

  getArea() {
    return this.width * this.length;
  }
}

class Square extends Rectangle {
  constructor(w) {
    super(w, w)
  }
}
```
