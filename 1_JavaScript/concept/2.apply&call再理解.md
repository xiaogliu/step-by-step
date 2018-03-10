先上结论： `call` 或者 `apply` 作用是改变 `this` 的指向，从而实现 **改变上下文**，这样做的好处是可以实现函数的复用。比如，当一个 objectA 中没有某个方法而另一个 objectB 中有，那么就可以借助 `call` 或者 `apply` 在 objectA 中使用 objectB 的方法。比如：   

```js
function Cat() {}

Cat.prototype = {
  food: 'fish',
  say: function () {
    console.log(`I love ${this.food}`);
  }
}

let blackCat = new Cat();
blackCat.say(); // I love fish
```

如果此时有个 `whiteDog = {food: 'bone'}` 如果也想让 whiteDog `say()`，但不想重新定义，可以借助 `call` 或者 `apply`。如下：   

```js
function Cat() {}

Cat.prototype = {
  food: 'fish',
  say: function () {
    console.log(`I love ${this.food}`);
  }
}

let blackCat = new Cat();

let whiteDog = {food: 'bone'};
blackCat.say.call(whiteDog);
```

用的比较多的，通过 `document.getElementsByTagName` 选择的 dom 节点是一种类似 array 的 array。它不能应用 Array 下的 `push` , `pop` 等方法。我们可以通过：`var domNodes =  Array.prototype.slice.call(document.getElementsByTagName("*"))`;这样domNodes 就可以应用 Array 下的所有方法了。

作者：杨志
链接：https://www.zhihu.com/question/20289071/answer/14644278
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

