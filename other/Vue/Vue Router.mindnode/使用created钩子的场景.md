`created` 是 vue 声明周期的一个阶段，表示：templates 和 virtual DOM 还没有 mounted，但可以访问 data 和 events（也可以获取路由参数了）。   

> 是不是表示JS部分OK了，但html还没渲染？不是很懂   

使用 `created` 的场景现在遇到的有如下：  

1. 将外部 import 的某个对象赋值给 data 对象中某个属性：   

```js
import utils from '../lib/utils'

data {
  utils: {},
}

// 如果在 mounted 中赋值，template 中如果使用会显示没有定义
created () {
  this.utils = utils;
}
```

2. 将路由的 query 对象赋值给 data 对象的某个属性：   

```js
data {
  urlPar: {},
}

// 如果在 mounted 中赋值，在 template 中的返回按钮使用时报错：Cannot read property 'name' of undefined
created () {
  this.urlPar = this.$route.query;
}
```

下面是错误代码：

```html
<div class="invest-detail-header">
  <router-link class="back-icon" :to="toInvestDetail()"><i class="fa fa-angle-left" aria-hidden="true"></i></router-link>
  <span class="title">支付中心</span>
</div>
```

```js
// 返回投资详情
toInvestDetail () {
  let url = this.urlPar.redirect;
  return url;
},

mounted () {
  this.urlPar = this.$route.query;
}
```

`Cannot read property 'name' of undefined` 指的应该是路由参数名字没有定义？
