本教程主要依据[Vue官方中文教程](https://cn.vuejs.org/v2/guide/index.html),记录按照官方教程写demo的过程中遇到的问题及解决方法。   

**window.onload=function(){}后面要不要加分号？！**

# Demo 1

**Hello World**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue start</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script>
    window.onload = function () {
      var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue!'
        },
      });
    };
  </script>
</head>
<body>
  <div id="app">
    {{ message }}
  </div>
</body>
</html>
```

注意点：   
1. Vue安装有多种方式，通过`<script>`标签引入可以以最简单的方式实现`Hello world!`的编写;
2. 一定不要忘记`window.onload`，不然回报“找不到`#app`的错误”。

# Demo 2

**`v-bind`**指令：给表达式动态绑定一个或多个属性（可以是标准html属性，也可以是vue组件封装的属性），对`v-bind`更多了解可以参考[官网API](https://vuejs.org/v2/api/#v-bind)。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue Demo2</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script>
    window.onload = function () {
      var app = new Vue({
        el: '#app',
        data: {
          message: '页面加载于：' + new Date().toLocaleString()
        },
      });
    };
  </script>
</head>
<body>
  <div id="app">
    <span v-bind:title="message">
      鼠标悬停几秒钟查看此处动态绑定的提示信息！
    </span>
  </div>
</body>
</html>
```

# Demo3

**`v-if`**指令，控制元素显示与否。   

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue Demo2</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script>
    window.onload = function () {
      var app = new Vue({
        el: '#app',
        data: {
          seen: true
        }
      });
    }
  </script>
</head>
<body>
  <div id="app">
    <span v-if="seen">
      可以通过JS控制我是否显示
    </span>
  </div>
</body>
</html> 
```

> 注意和`v-show`的区别，可参考这片文章：[VUE中的v-if与v-show](http://www.cnblogs.com/wmhuang/p/5420344.htmldd)

# demo4

**`v-for`**指令，可以进行循环

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>directive v-for</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script>
    window.onload = function () {
      var app = new Vue({
        el: '#app',
        data: {
          todos: [
            {text: 'learn js'},
            {text: 'learn html'},
            {text: 'learn css'},
          ]
        }
      });
    };
  </script>
</head>
<body>
  <div id="app">
    <ul>
      <li v-for="item in todos">
        {{item.text}}
      </li>
    </ul>
  </div>
</body>
</html>
```

# demo5

**`v-on`**，与用户互动，此处是用户点击事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World!</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script>
    window.onload = function () {
      var app = new Vue({
        el: '#app',
        data: {
          message: 'i am student'
        },
        methods: {
          reverseMessage: function () {
            this.message = this.message.split(' ').reverse().join(' ')
          }
        }
      });
    };
  </script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">click me!</button>
  </div>
</body>
</html>
```

# demo6

**`v-model`**，双向绑定

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>directive v-model</title>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <script>
    window.onload = function () {
      var app = new Vue({
        el: '#app',
        data: {
          message: 'Hello vue!'
        }
      });
    };
  </script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
    <input type="text" v-model="message">
  </div>
</body>
</html>
```

# demo7 

**组件化应用构建**，使用大量





