`getter` 和 `setter` 函数存在于对象的 accessor property 中，如这个属性的名称 “accessor” 指的是访问者，访问什么？答，其宿主对象的 **数据属性**（data property）。   

看了《大话设计模式》附录中面向对象基础对于属性的 `get`, `set`（基于C#） 解释后理解更为深刻了。   

另外，在 C# 中可以定义私有成员，虽然，JS 可以在对象中约定私有属性（将只能通过对象自己内部方法访问的自己的属性，及外部访问不了，惯例用 `_` + `属性名` ），比如下面例子：   

```js
const book {
  _year: 2004,
  edition: 1,
}

Object.defineProperty(book, 'year', {
  get () {
    return this._year;
  },
  set (newValue) {
    this._year = newValue;
    this.edition += newValue - 2004;
  },
});

book.year = 2006;

console.log(book.edition); // 3
console.log(book._year); // 2006，不会报错
```

原本想把 `_year` 设置为私有属性，sorry，不只能，依然可以通过 `book._year` 进行访问。   

> 但函数可以模拟私有成员，此不赘述。
