vuex 的优势在复杂状态管理中才能提现出来。   

如果项目中有多级菜单，且不同组件中散布多个相同级别的菜单，项目同一时刻各级菜单有且仅有一个高亮，菜单跳转时除了路由改变，相应菜单也要高亮（之前的恢复非高亮状态），这便是个使用 vuex 再好不过的场景。   

# 使用 DOM 操作进行简单菜单管理   

使用 DOM 进行菜单管理，背后的思想是：在点击菜单的同时，将事件对象传入事件处理程序，想让当前高亮的 menu 非高亮，再让点击的 menu 高亮。

```html
<div class="menu-url">
  <span class="active userList" @click="menuClicked($event, 'userList')">注册</span>
  <span class="chargeList" @click="menuClicked($event, 'chargeList')">充值</span>
  <span class="buyList"  @click="menuClicked($event, 'buyList')">购买</span>
  <span class="bangList"  @click="menuClicked($event, 'bangList')">到期</span>
  <span class="withDrawList"  @click="menuClicked($event, 'withDrawList')">提现</span>
</div>
```

```js
menuClicked (event, url) {
  // 当前高亮的 menu 非高亮
  const currentActiveLink = this.querySelector('.active');
  currentActiveLink.classList.remove('active');

  // 当前点击的 menu 高亮
  event.target.classList.add('active');

  // 路由跳转
  this.$router.push(`/panel/list/${url}`);
},
```

这样虽然实现了点击切换时 menu 高亮，但有一个 bug：每次初始化都会使默认的 menu 变成高亮，如果此时在非默认高亮的 menu 中用户手动刷新页面，会导致 menu 高亮错误（比如在 buylist 页面刷新页面后，页面内容依然停留在 buylist，但高亮的菜单却变成了 userlist）。   

如果要解决这个 bug，就需要在本地存储（刷新不改变存储状态） menu 状态，本地存储可以选择不同的方案，在此不做讨论，但可以肯定的是 DOM + 本地存储控制 menu 高亮的方案在项目逐渐变大以后会变得难以维护。   

现在是 vuex 登场的时候了。   

# 使用 vuex 进行菜单管理   

使用 vuex 进行菜单管理需要**在开发前就规划好菜单的层级**，以便在 vuex 分配 `state` 和 `mutations`。 


## 规划层级   

确定项目中哪些是一级菜单，哪些是二级菜单，以此类推…… 这里要注意的是，为简化操作，同级别菜单都以不同名称命名，这样在 vuex 中就不需要关注菜单属于那个页面，只关注状态就好。菜单层级通常如下：   

```bash
|-root
|  |
|  |-first-menu1
|  |     |- second-menu1
|  |     |- second-menu2
|  |     |- second-menu3
|  |
|  |-first-menu2
|        |- second-menu3
|        |- second-menu4
|        |- second-menu5
``` 

## 在 vuex 分配 `state` 和 `mutations`  

不同层级的菜单分别占用一个 `state`，至于 `mutations`，本例中不同 `state` 分别对应写了一个 `mutations`，实际工作中为了更大程度减少代码复用，对于 menu 的状态管理可以只写一个 `mutations`，通过传参判断是更改哪个层级及对应的 menu。

```js
const store = new Vuex.Store({
  state: {
    // 初始化
    activeFirstMenu: 'firstMenu1',
    activeSecondMenu : 'secondMenu1',
  },
  mutations: {
    // 更改一级菜单
    changeFirstActiveMenu (state, menu) {
      state.activeFirstMenu = menu;
    },
    // 更改二级二级菜单
    changeSecondActiveMenu (state, menu) {
      state.activeSecondMenu = menu;
    }
  },
});
```

## 组件中渲染   

### 在 template 动态加载高亮 class，通过 vuex 中 state 控制：

```html
<div class="subMenu">
  <span :class="{ activeSecondMenu: activeMenu.secondMenu1 }" @click="menuClicked('secondMenu1')">secondMenu1</span>
</div>
<div class="subMenu">
  <span :class="{ activeSecondMenu: activeMenu.secondMenu2 }" @click="menuClicked('secondMenu2')">secondMenu2</span>
</div>
<div class="subMenu">
  <span :class="{ activeSecondMenu: activeMenu.secondMenu3 }" @click="menuClicked('secondMenu3')">secondMenu3</span>
</div>
```

### 写 js 时有个技巧：路由 path 和对应高亮的 menu 名称最好相同，因为路由跳转和高亮 menu 直接相关，这样可以减少一个参数：

```js
data () {
  return {
    // 初始化
    activeMenu: {
      // menu 名称相同，和对应路由的 path 相同
      secondMenu1: '',
      secondMenu2: '',
      secondMenu3: '',
    },
  };
},
computed: {
  activeMenuName () {
    // 检测 vuex 中 activeSecondMenu 的变化
    return this.$store.state.activeSecondMenu;
  }
},
methods: {
  menuClicked(path) {
    // 取消当前 tab 高亮
    this.activeMenu[this.activeMenuName] = false;

    // 更新 vuex 状态及 menu 高亮
    this.$store.commit("changeSecondActiveMenu", path);
    this.activeMenu[this.activeMenuName] = true;

    // 路由跳转 path 和对应 menu 名称相同 
    this.$router.push(`/somePath/${path}`);
  },
  init () {
    // 刷新页面重置正确高亮菜单tab
    this.activeMenu[this.activeMenuName] = true;
  },
},
mounted: {
  this.init();
},
```

# 其他

## 对于 vuex 的优化

上文有谈到，实际工作中为了更大程度实现代码复用，对于某个类别的状态管理可以只写一个 `mutations`，通过传参（[Payload](https://vuex.vuejs.org/zh-cn/mutations.html)）判断更改内容。还是以 menu 管理为例，可进行下面的优化：   

### vuex 优化后如下：   

```js
const store = new Vuex.Store({
  // 其他代码略

  mutations: {
    // 优化后代码，合并 changeFirstActiveMenu 和 changeSecondActiveMenu
    changeActiveMenu (state, menuInfo) {
      state[menuInfo.menuHierarchy] = menuInfo.name;
    }
  }
});
```

### 组件 js 部分优化后如下：   

```js
methods: {
  menuClicked(path) {
    // 其他代码略高亮

    // 优化后代码：更改一级和二级菜单触发同个 mutation
    this.$store.commit("changeActiveMenu", {
      menuHierarchy: 'activeFirstMenu',
      name: path,
    });

    this.$store.commit("changeActiveMenu", {
      menuHierarchy: 'activeSecondMenu',
      name: path,
    });

    // 其他代码略
  },
},
```
