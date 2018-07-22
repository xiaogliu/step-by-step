# 从生成器到 Promise 再到 async-await（二）

这是 _从生成器到 Promise 再到 async-await_ 的第二部分，第一部分介绍了生成器，这部分介绍 Promise，第三部分介绍 async-await。

# 1）Promise 概述

## 1.1 概念

`Promise`是 ES6 引入的一个内建对象，通过它可以创建 Promise 实例。

Promise 实例可以想像成一个占位符，当获取到异步数据后，更新 promise。

这里需要注意的是，异步数据不是直接赋值给 promise 实例，而是赋值给 promise 实例的内部属性`[[PromiseValue]]`，通过 promise 的`then()`或者`catch()`方法可以获取到这个值。

这也是 “promise” 名称的由来：承诺将来会给一个值，这个值可能是成功的数据也可能是错误信息，总之，会给一个值。

## 1.2 基本用法

基本用法包含 promise 创建、获取 promise 完成后的值以及错误捕获，他们三者结合使用才算完成了一次 promise 的完整使用过程。

### 1.2.1 创建 promise 实例及 executor 函数

通过内建对象`Promise`（promise 的构造函数）创建 promise 实例，其中，`Promise`接收一个函数作为参数，这个函数称之为 executor 函数。

Executor 函数本身接收两个函数作为参数，通常命名为`resolve`和`reject`。它们接收一个值作为参数，作为 promise 完成之后的值传给 promise 实例的内部属性`[[PromiseValue]]`。它们当中只能有一个执行，执行之后表示当前 promise 已完成（当然，分别表示两个不同的已完成状态，兑现或拒绝）。

> 实际开发中我们会把期待得到的数据传给`resolve`函数，把错误信息传给`reject`函数。

另外，Executor 函数在传入`Promise`时会立即执行。见下面例子：

```js
// executor 函数在传入 Promise 后会立即执行
var executor = function(resolve, reject) {
  console.log(111);

  // resolve 的执行结果需配合 then() 提取，这里给 resolve 传入了一个立即执行函数作为参数
  resolve(
    (() => {
      console.log(222);
      return 333;
    })()
  );

  console.log(444);
};
var p = new Promise(executor);

console.log(555);
```

上面输出分别为:`111`,`222`,`444`,`555`。

分析：

1.  `executor`函数立即执行，所以`111`先打印出来；
2.  `resolve`此时也立即执行，为了体现这一点，给其传入了立即执行函数，直接打印出了`222`。实际上此时 promise 已经完成，但我们还无法访问完成后的 promise，需要配合下文讨论的`then()`访问；
3.  紧接着是后面代码执行，打印`444`；
4.  最后打印`555`。

> 虽然一直在讨论`resolve`，`reject`执行时过程同`resolve`，不单独讨论。

到目前为止，我们看到的都是同步代码，那 promise 和异步有什么关系呢？

实际使用中，`resolve`会将 promise 完成后的数据传给`then()`方法，而`then()`中的代码是放在微任务中异步执行的，这是其一；
第二点是，`resolve`往往不是立即执行，比如请求服务器上的数据，数据请求完成后再执行`resolve`，这个时候，`resolve`本身也是异步执行的。

### 1.2.2 then() 方法

promise 实例拥有`then()`方法，它设计的目的是 **异步获取** promise **完成后** 的值。

`then()`方法接受两个函数作为参数（这两个参数都不是必须），当 promise 完成后会执行它们：

- 第一个参数为称为 success 回调函数，在 promise 执行`resolve`函数后执行，同时可以接收`resovle`的入参作为自己的入参；
- 第二个参数称为 failure 回调函数，在 promise 执行`reject`函数或者程序发生异常时执行，可以接收`reject`的入参或者错误信息作为参数。见下面例子：

> `resolve`或者`reject`传给`then()`的回调函数的参数，实际就是 promise 的内部属性`[[PromiseValue]]`的值，`[[PromiseValue]]`作为 promise 实例内部属性没法直接访问，必须借助`then()`或者下文将要提到的`catch()`方法获取。  
> 另外，这个属性很重要，因为 promise 成功兑现后，它上面 **保存的通常就是我们需要的异步数据**。

这里要注意，函数完成之后才执行`then()`，并且`then()`里面的函数是异步执行的，**最快在当前事件循环的微任务开始执行时执行**，这里有两点要注意：

1.  虽然是异步，但仍然是在当前事件循环中执行（微任务在当前事件循环中执行，只是在宏任务之后），所以，会比`setTimeout()`中的代码先执行（`setTimeout()`中代码会在下一个事件循环中执行）；
2.  之所以称之为异步，是因为`then()`里面的代码会移到当前事件循环的微任务中执行，如果`then()`之后还有宏任务代码需要执行，微任务要等宏任务中的代码执行完之后才执行。

> 关于 JS 运行机制更详细的讨论可以参考这篇文章 [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

看下面代码：

```js
var p = new Promise((resolve, reject) => {
  // 直接 resolve，所以 then 执行 success 函数，同时传入 111 作为参数
  resolve(111);
});

var success = function(resolvedValue) {
  console.log("resolvedValue:", resolvedValue);
};

var failure = function(errorInfo) {
  console.log("errorInfo:", errorInfo);
};

// 下一个事件循环中执行
setTimeout(() => console.log(222));

// success 和 failure 在当前事件循环的微任务中执行
p.then(success, failure);

// 当前事件循环宏任务中最后一行代码
console.log(333);
```

上面代码中，我们在 executor 函数中直接执行了`resolve`，所以`then()`立即执行，并且把`111`传给`success`函数，然后把`success`函数放到了 **当前事件循环的微任务队列中**：

上述代码分别输出：`333`，`resolvedValue: 111`，`222`

分析：`setTimeout()`中代码在下一次事件循环中执行，所以最后输出`222`；`then()`中的代码在当前事件循环的微任务中执行，需要等到当前事件循环宏任务中的代码执行完，即`console.log(333)`执行完再执行，所以先输出`333`，再输出`resolvedValue: 111`。

为了分离错误处理的代码，promise 还提供了 catch 方法，见下面用法。

### 1.2.3 catch() 方法

promise 被拒绝后除了可以在`then()`中传入第二个参数处理，还可以通过`catch()`方法处理。

`catch()`可通过在`then()`后进行链式调用（加多一个`.`），作用等同在`then()`中传入的第二个参数，见下代码：

```js
var p = new Promise((resolve, reject) => {
  reject(111);
});

p.then(resolvedValue => console.log(resolvedValue)).catch(errorInfo =>
  console.log(errorInfo)
);
```

执行上述输出：`errorInfo: 111`。

如果只处理一个 promise，两种方式差不多，至于选择哪一种，看个人喜好。但通过链式调用处理多个 promise 时，用`catch`更加方便。

**但不管怎样，都要选择一种错误处理方式，不然当出现错误时引擎会报错：`Uncaught (in promise)`**

# 2）Promise 状态及内部属性

Promise 作为异步数据的占位符，在整个生命周期中会有不同状态，这些状态在其内部属性`[[PromiseStatus]]`中有记录。

## 2.1 Promise 状态

Promise 整个生命周期状态可分为两个部分：未完成状态和已完成状态，其中，未完成状态只有 pending 一种情况，而已完成状态又分为 fullfilled（已兑现，`resolve`函数执行）和 rejected（被拒绝，`reject`函数执行或者 promise 处理时发生异常）两种情况，见下图：

![promise state](http://ol9ge41ud.bkt.clouddn.com/promise_state.png)

_图拍引自 Secrets of the JavaScript Ninja(2nd)_

> 英文已完成状态称为 “resolved states”，后面将要介绍的`[[PromiseStatus]]`也有`resolved`状态值。从生命周期的角度看，如果用英文描述，则 resolved states 包括`resolved`和`rejected`两种情况。

另外，**promise 一般完成，状态就不能改变**。

## 2.2 Promise 内部属性

Promise 实例创建以后，我们需要关注两个内部属性：

`[[PromiseStatus]]`：保存当前 promise 的状态，可取值`pending`,`resolved`,`rejected`；
`[[PromiseValue]]`：当 promise 在未完成状态时，其值为`undefined`，当 promise 完成后，其值为异步数据，或者错误信息。

见下面例子：

- pending 状态

```js
var p = new Promise((r, j) => {});

console.log(p);
```

此时，p 处于`pending`状态，内部属性值如下：

```js
// 实际代码中这样写无效，这里只是延时，但可以在浏览器 console 中看到
p {
  [[PromiseStatus]]: 'pending',
  [[PromiseValue]]: undefined
}
```

- resolved 状态

```js
var p = new Promise((r, j) => {
  r(111);
});

console.log(p);
```

此时，p 处于`resolved`状态，内部属性值如下：

```js
p {
  [[PromiseStatus]]: 'resolved',
  [[PromiseValue]]: 111
}
```

- rejected 状态

```js
var p = new Promise((r, j) => {
  j(111);
});

console.log(p);
```

此时，p 处于`rejected`状态，内部属性值如下：

```js
p {
  [[PromiseStatus]]: 'rejected',
  [[PromiseValue]]: 111
}
```

> 这里没有捕获错误，所以会报错`Uncaught (in promise) 111`，不过，此处不是我们关注的重点

## 2.3 关于 rejected 状态

两种情况可能导致 promise 进入 rejected 状态：

- 显式拒绝：在 promise 的 executor 函数中执行`reject()`;
- 隐式拒绝：处理 promise 的时候程序发生了异常。

显式拒绝的情况我们在上文已看，下面我们看个隐式拒绝的例子：

```js
// promise 隐式拒绝
var p = new Promise((r, j) => {
  a++;
});

p.then().catch(e => console.log("出错了：", e));
```

 因为`a` 没有定义，所以`a++`执行时报错了，promise 被拒绝，然后我们在`catch()`方法中捕捉到了错误，此时`p`内部属性描述如下：

```js
p {
  [[PromiseStatus]]: 'rejected',
  [[PromiseValue]]: 'ReferenceError: aaa is not defined ...',
}
```

## 2.4 来一道习题

关于这个习题的分析看附录部分。

```js
console.log("1");

setTimeout(function() {
  console.log("2");
  new Promise(function(resolve) {
    console.log("3");
    resolve();
  }).then(function() {
    console.log("4");
  });
}, 400);

new Promise((resolve, reject) => {
  console.log("5");
  setTimeout(() => {
    resolve("6");
  }, 500);
  setTimeout(() => {
    reject("7");
  }, 1000);
})
  .catch(res => {
    console.log("8,", res);
  })
  .then(res => {
    console.log("9,", res);
  });

new Promise(function(resolve) {
  console.log("10");
  resolve();
}).then(function() {
  console.log("11");
});

console.log("12");
```

# 3）使用 Promise

## 3.1 用 promise 封装 ajax

这部分将用 promise 封装 ajax 的 GET 请求，为接下来的链式调用 promise 做准备。

> 最简单的 ajax 请求，没有考虑兼容性，请求错误处理等，主要说明 promise 应用

```js
// 使用 promise 封装 ajax
function promiseAjax(url) {
  // 返回 promise 对象
  // 这样就可以后续通过 then 或者 catch 处理异步数据
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 传递出成功的数据
        resolve(xhr.responseText);
      } else {
        // 传递出错误信息
        reject("出错了：", xhr.status);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  });
}
```

使用通过 promise 封装过的 ajax 就简单了：

```js
promiseAjax("someURL")
  .then(data => console.log(data))
  .catch(e => console.log(e));
```

promise 在请求大量异步数据时优势会体现的更明显。

## 3.2 链式调用 Promise

链式调用之所以能够实现是因为`then()`和`catch()`会 **返回一个新的 promise 对象**。

链式调用有几个特点：

- 当前面的 promise 完成后，才会执行后面的 promise；
- 如果`then()`或`catch()`没有显式 return promise，则当前返回的 promise 默认是兑现的；
- 如果`then()`或`catch()`显式 return promise，则当前返回的 promise 是兑现还是拒绝取决于`then()`或`catch()`显式 return promise 的状态。

基于上，以`then()`为例，可能出现几种写法：

### 3.2.1 没显式的 return 语句

`then()`里面没有显式返回任何代码，如下：

```js
var p = new Promise((r, j) => {
  r(111);
});

p.then(v => console.log(v))
 .then(v => console.log(v));
```

没有显示的`return`语句，默认返回已完成且`[[PromiseValue]]`值为`undefined`的 promise

上面代码等同于：

```js
var p = new Promise((r, j) => {
  r(111);
});

var p1 = p.then(v => {
  console.log(v);
  return Promise.resolve();
});

// p1 已兑现，且 [[PromiseValue]] 值为 undefined
p1.then(v => console.log(v));
```

> Promise.resolve() 返回一个完成状态的 promise，并且`p1.then()`也返回一个已完成的 promise，但没有使用

此时 p、p1 值如下：

```js
p {
  [[PromiseStatus]]: "resolved",
  [[PromiseValue]]: 111,
}

// p1 已完成，但值是 undefined
p1 {
  [[PromiseStatus]]: "resolved",
  [[PromiseValue]]: undefined,
}
```

### 3.2.2 显示 return 非 promise

如果在`then()`中显式`return`非 promise，返回的数据就是当前 promise 兑现后的`[[PromiseValue]]`的值：

```js
var p = new Promise((r, j) => {
  r(111);
});

p.then(v => 222).then(v => console.log(v));
```

以上代码相当于：

```js
var p = new Promise((r, j) => {
  r(111);
});

var p1 = p.then(v => {
  return Promise.resolve(222);
});

// p1 已兑现，且 [[PromiseValue]] 值为 222
p1.then(v => console.log(v));
```

此时 p、p1 的值如下：

```js
p {
  [[PromiseStatus]]: "resolved",
  [[PromiseValue]]: 111,
}

// p1 已完成，但值是 undefined
p1 {
  [[PromiseStatus]]: "resolved",
  [[PromiseValue]]: 222,
}
```

- **NOTICE**：

返回错误对象也是相当于返回兑现的 promise，如下：

```js
var p = new Promise((r, j) => {
  r(111);
});

p.then(() => new Error("出错了"))
  .then(v => console.log("then:", v))
  .catch(e => console.log("error:", e));
```

此时打印的是`then:出错了`，因为相当于`() => Promise.resolve(new Error('出错了'))`，此时是兑现的 promise，只不过显式传递了一个“出错了”的数据给当前兑现后的 promise 的`[[PromiseValue]]`。

### 3.2.3 显式 return 未完成的 promise

但在`then()`中显式返回未完成的 promise 时，当前`then()`返回的 promise 是兑现还是拒绝取决于显式返回的未完成的 promise 的状态。

如果显式返回未完成的 promise 最终兑现了，当前 promise 是兑现状态，否则为拒绝状态。这是实际工作中常见的场景，比如链式调用相互依赖的异步数据， 3.2.4 中我们将看到这个例子，现在看下基本用法。

最终兑现的状态和前面的显式返回`Promise.resolve()`相同，我们看个最终被拒绝的例子：

```js
var p = new Promise((r, j) => {
  r(111);
});

p.then(v => new Promise((r, j) => j()))
  .then(v => console.log("兑现"))
  .catch(e => console.log("拒绝"));
```

此时会打印出 `拒绝`，因为显式返回未完成的 promise 最终被拒绝了。相当于：

```js
var p = new Promise((r, j) => {
  r(111);
});

p.then(v => {
  return Promise.reject();
})
  .then(v => console.log("兑现"))
  .catch(e => console.log("拒绝"));
```

- **NOTICE**

如果当前返回的是被拒绝的 promise，则后面的所有`then()`都不执行，直到遇到第一个`catch()`，执行`catch()`里面的代码，并且当前`catch()`也会返回一个 promise。

> 但`catch()`返回的 pormise 一般不用，只在链式调用的最后放个`catch()`捕捉错误就好了，如下：

```js
var p = new Promise((r, j) => {
  r(111);
});

p.then(v => new Promise((r, j) => j()))
  .then(v => console.log("兑现1")) // 不执行
  .then(v => console.log("兑现2")) // 也不执行
  .catch(e => console.log("拒绝"))
  .then(v => console.log("兑现3")); // 执行，但一般不再 catch 后继续链式调用了
```

上面返回 `拒绝` 和 `兑现3`。

### 3.2.4 一个真实的例子

如果几个异步数据间存在依赖关系，可以使用 promise 的链式调用方式，比如：

需求：_请求 URL1 得到 data1；请求 URL2 得到 data2，但 URL2 = data1[0].url2；请求 URL3 得到 data3，但 URL3 = data2[0].url3_。

使用 promise 链式调用可以这样写代码：

```js
// promiseAjax 在 3.1 中有定义
promiseAjax("URL1")
  .then(data1 => {
    // 异步获取 data1 做相关处理
    console.log(data1);

    // 请求新数据依赖 data1 的数据，并将获取到的数据传递出去
    // 且要记得显式 return
    return promiseAjax(data1[0].url2);
  })
  // 如果不需要对 data2 做处理，可以使用箭头函数简化代码
  .then(data2 => promiseAjax(data2[0].url3);)
  .then(console.log(data3))
  // 任何一个出现错误，都会捕捉到
  .catch(e => console.log(e));
```

## 3.3 Promise 其他用法

Promise 还有两个常用功能`promise.all()`和`promise.race`，它们都用于一次处理多个 promise，不同点是：

- `promise.all()`可以一次处理多个 promise，我们 **不需要关心哪个先完成，全部兑现后后统一返回，但任何一个 promise 被拒绝都会导致整个 promise 被拒绝**；

- 使`promise.race()`时我们也 **不需要关心执行顺序，但任何一个 promise 完成就会立即返回这个完成的 promise**。

它们的不同点主要体现在 promise 兑现后传递给`then()`的数据：`promise.all()`返回的是**所有** promise 兑现后组成的数组数据，而`promise.race()`返回的是 **最先完成的那一个** promise 返回的数据。见下面的代码例子：

- `promise.all()`

```js
promise.all[
  promiseAjax("URL1"),
  promiseAjax("URL2"),
  promiseAjax("URL3"),
].then(data => {
  // data[1] 对应请求 URL1 后得到的数据，其他蕾丝
  console.log(data[1], data[2], data[3]);
}).catch(e => console.log(e));
```

- `promise.rase()`

```js
promise.race[
  promiseAjax("URL1"),
  promiseAjax("URL2"),
  promiseAjax("URL3"),
].then(data => {
  // data 表示先完成的那个 promise 请求的 URL 数据
  console.log(data);
}).catch(e => console.log(e));
```

# 4）promise 的实现

限于篇幅，将在另一篇文章中专门写 promise 的源码实现。

> 网上有很多类似文章了，自己写一遍加深印象。

# 5）其他说明

相比使用回调函数，promise 已经使代码得到了很大改善， 但相比同步代码还是看着有些复杂，比如，链式调用那部分，代码看上去还是有些混乱。

**那能不能用写同步代码的方式请求异步数据呢**？可以的，这就是第三部分将要介绍的 async-await。

那是不是说 promise 就没用了呢？并不是，async-wait 实际是生成器 + promise 的语法糖，只有理解了生成器和 promise 的原理，才能更好的理解 async-await。

# 附录

## 2.4 答案及分析分析

2.4 的习题分析，见注释：

```js
console.log("1"); // 1

setTimeout(function() {
  /**
   * setTimeout 下一个事件循环执行
   * 如果多个 setTimeout 执行顺序 先进先出
   */
  console.log("2"); // nextLoop（400）: 2
  new Promise(function(resolve) {
    /**
     * new Promise 接受一个函数做参数
     * 此函数体中的代码立即执行
     */
    console.log("3"); // nextLoop（400）: 2, 3
    resolve();
  }).then(function() {
    /**
     * then 中的代码在当前事件循环的微任务中执行
     * 此时没有其他宏任务
     */
    console.log("4"); // nextLoop（400）: 2, 3, 4
  });
}, 400);

new Promise((resolve, reject) => {
  console.log("5"); // 1，5
  setTimeout(() => {
    /**
     * promise 一旦完成（兑现或拒绝）状态就不能改变
     * 所以后面的 reject 不执行
     * 且这个promise在下一个时间循环中完成
     */
    resolve("6");
  }, 500);
  setTimeout(() => {
    reject("7"); // 前面已兑现，此处不执行
  }, 1000);
})
  .catch(res => {
    /**
     * 这个promise已兑现，不执行catch
     */
    console.log("8,", res); // 不执行
  })
  .then(res => {
    /**
     * 加入下一个事件循环的微任务
     */
    console.log("9,", res); // nextLoop（500）： 9, 6
  });

new Promise(function(resolve) {
  /**
   * 理解执行
   */
  console.log("10"); // 1，5，10

  /**
   * 立即解决，但 then 中代码还是要放在当前循环的微任务中
   */
  resolve();
}).then(function() {
  /**
   * 放入微任务等待执行
   */
  console.log("11"); // 等待2（11）
});

console.log("12"); // 1，5，10，12，等待2

/**
 * 当前循环中的等待后输出: 1，5，10，12，11
 */

/**
 * 下一个事件循环（nextLoop）后输出: 1，5，10，12，11，nextLoop(400), nextLoop(500)
 * 即：1，5，10，12，11，2, 3, 4, 5, 9, 6
 */
```

# 参考资料

[美]JOHN RESIG,BEAR BIBEAULT and JOSIP MARAS 著（2016），Secrets of the JavaScript Ninja (Second Edition)，第 6 章 promise 部分，Manning Publications Co.

[美]Nicholas C. Zakas 著，刘振涛 译（2017），深入理解 ES6，p86~p97，电子工业出版社
