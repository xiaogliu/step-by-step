最开始接到公司通知要开发 React Native APP 的时候，很兴奋，因为之前的技术栈主要是 Vue 和 Angular，虽然一直想在实践中使用 react对于 React 只是写过几个 Demo，一直想在实际项目中使用但没有机会。不过公司给的开发时间很短，从设计需求到第一版送审只给了一个月时间。鉴于之前使用 Vue 的经验（即便不是很熟的情况下也可以把官网 Demo 撸下来改改就能上线，功能及性能可以后续迭代优化）以及业务 API 90%以上都已和后台同学联调 OK，当时想一个月绰绰有余。

虽说最后完成了任务（App 线上地址[iOS](https://itunes.apple.com/cn/app/%E6%A6%84%E7%9B%9B%E9%87%91%E8%9E%8D/id1336295162?mt=8)，[安卓](https://static-https.lansheng8.com/lsapp_1.0.1.apk)），但开发中确很多坑。

首先，难以找到一个开箱即用的 React Native APP Demo。目前存在的 Demo 要么过于简单，比如 React Native 官网提供的 Demo [AwesomeProject](https://facebook.github.io/react-native/docs/getting-started.html) ，这个 Demo 只提供了最简功能，对于路由（导航组件）、状态管理等并没有涉及。虽然 React Native 教程中对于复杂应用应如何选择组件及第三方库都有提及，但并没有给出完整示例。而另一方面，又有很多 [React Native APP](https://github.com/ReactNativeNews/React-Native-Apps) 虽已开源，但都是用于特定场合的完整 APP，有些 APP 的目录结构本身就不友好，并且也没有完整的说明文档。

其次，React 本身的学习曲线就相对陡峭，尤其涉及状态管理部分，很难找到可以直接 copy-paste 的代码，除此之外原生 App 本身还有很多区别于 web 的需求。

鉴于以上原因，所以决定写篇文章详细介绍开发 React Native APP 的过程。本文使用的 Demo 完整代码在这 [react_native_complete_demo](https://github.com/xiaogliu/react_native_complete_demo)，如果想跟着本文步骤一步步，可采用下面的方法：

1） 将代码 clone 到本地；
2） 输入 `git tag` 查看精心编写的 tag（此处微笑脸）；
3） 查看对应 tag 的 commit，可以看到相应代码改动（或者直接把代码回滚到某个 commit）。

# 一 准备工作

## 1.1 开发工具

如果要开发 iOS 应用并发布到 APP Store 必须使用 xCode 并有 Apple 开发者账号。如果是开发安卓应用，有电脑就好了。

## 1.2 代码检查及自动修正

开始改造代码之前，推荐先安装通过 eslint 和 prettier 作为代码检查和自动格式化工具，这样可以确保自己写的代码始终如一且避免低级错误，我使用 vscode 作为编辑器，之前写过一篇文章[VSCode 配置 react 开发环境](https://xiaogliu.github.io/2017/12/26/develop-react-using-vscode/)，如果你也使用 vscode 可参考下。

最终的目的就是保存操作后代码按照 eslint 的配置，自动格式化代码。

# 二 官方 Demo 下载及介绍

官方 demo 虽然不完整，但却是一个很好的开始。介绍完官方 Demo（包括环境配置），后文会一步步介绍如何从这个不完整的官方 Demo 改造成可用于生产的 APP。

## 2.1 环境配置

下载官方 Demo：AwesomeProject，然后运行。

所需的环境配置[官方文档](https://facebook.github.io/react-native/docs/getting-started.html)讲的很清楚，这里不在赘述。需要指出的是 React Native 对于运行 Demo 提供了两种方法：一种是在 [Expo](https://expo.io/) 客户端中运行，另一种是编译成原生代码（安卓编译成 Java，iOS 编译成 objective-C）后在模拟器或者在真机上运行。推荐直接使用第二种，如果想发布 APP 这也是绕不过去的。

如果之前没有开发过原生 APP，还需要熟悉下原生 APP 的开发工具：安卓使用 [Android Studio](https://developer.android.com/studio/index.html)，iOS 使用 [Xcode](https://developer.apple.com/support/xcode/)。它们如何配合 React Native 使用在 [官方文档](https://facebook.github.io/react-native/docs/getting-started.html)有说明，这部分没有太多坑，遇到问题自行谷歌一般都有解决方案。

需要说明的是 Android Studio 很多依赖更新需要访问谷歌服务，所以请自备科学上网工具。另外，为了照顾不同阶段的开发者，我还是将环境配置过程中可能遇到的问题汇总到了这里，如果配置过程出现问题，不妨先去这篇文章中搜索下看有没有解决方案。如果再有问题，欢迎通过留言、邮件等各种方式讨论。

> 在 [step_by_step/other/react/react_native/](https://github.com/xiaogliu/step_by_step/tree/master/other/react/react_native) 详细记录了我在初次使用 React Native 过程中遇到的问题及解决方案，因为以记录为目的，所以稍显啰嗦，有兴趣可以看下。

## 2.2 官方 Demo 目录介绍

良好的目录结构有助于今后的开发及维护，本文后半部分每添加新功能，除了代码部分，如果目录结构有变，还会着重指出。首先，让我们看下官方 Demo 的目录结构：

![AwesomeProject 目录结构](http://ol9ge41ud.bkt.clouddn.com/aw_content.jpeg)

上面的目录结构说明如下，重要的有：

* `android/` android 原生代码（使用 android studio 要打开这个目录，如果直接打开父目录报错）
* `ios/` ios 原生代码（使用 xcode 打开这个目录，如果直接打开父目录报错）
* `index.js` 打包 app 时进入 react native（js 部分） 的入口文件（0.49 以后安卓、ios 共用一个入口文件）
* `App.js` 可以理解为 react native（js 部分） 代码部分的入口文件，比如整个项目的路由在这里导入

上面是最重要的四个目录/文件，其他说明如下：

* `_test_/` 测试用（暂未使用）
* `app.json` 项目说明，主要给原生 app 打包用，包括项目名称和手机桌面展示名称 [React Native : 0.41 app.json](https://stackoverflow.com/questions/42409459/react-native-0-41-app-json)
* `package.json` 项目依赖包配置文件
* `node_modules` 依赖包安装目录
* `yarn.lock` yarn 包管理文件
* 其他配置文件暂时无需改动，在此不做说明

# 3 配置路由

这里使用 [react navigation](https://reactnavigation.org/docs/getting-started.html) 管理路由，大而全的介绍或者原理说明不是这部分的重点，这里主要讲怎么用。

react navigation 常用 API 有三个：

* `StackNavigator`：页面间跳转，每次跳转后都会将前一个页面推入返回栈，需要返回上个页面特别好用
* `TabNavigator`：顶部或底部 tab 跳转，一般在底部使用
* `DrawerNavigator`：侧滑导航

最为常用的是前两个，接下来也只介绍前两个的使用。

## 3.1 StackNavigator 实现页面间跳转

**首先我们要调整下目录结构**，调整后的结构如下：

![添加 StackNavigator 后目录结构](http://ol9ge41ud.bkt.clouddn.com/stack_navigator.png)

* `src/` 放置所有原始的 react native 代码
* `config/` 配置文件，比如路由配置
* `route.js` 路由配置文件
* `screens/` 所有页面文件
* `ScreenHome/` 这个目录是放具体页面文件的，为了进一步关注代码分离，里面又分为三个文件：`index.js` 中包含逻辑部分，`style.js` 中包含样式部分；`view.js` 中包含视图或者说页面元素部分。其他页面文案结构与此相同。

> 注意页面文件的命名方式：大驼峰命名法，react native 推荐组件命名用大驼峰命名法，每个页面相当于一个组件。

简单介绍了 react navigation 下面进行具体改造:

1）首先配置路由：路由文件 `route.js` 此时内容如下，这也是 `StackNavigator` 最简单的使用方式：

```js
/**
 * route.js
 */

// 引入依赖
import React from "react";
import { StackNavigator } from "react-navigation";

// 引入页面组件
import ScreenHome from "../screens/ScreenHome";
import ScreenSome1 from "../screens/ScreenSome1";

// 配置路由
const AppNavigator = StackNavigator({
  ScreenHome: {
    screen: ScreenHome
  },
  ScreenSome1: {
    screen: ScreenSome1
  }
});

export default () => <AppNavigator />;
```

2）更新 `App.js`，对接路由文件：

```js
/**
 * App.js
 */

// 引入依赖略

export default class RootApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // 渲染页面
    return <Route />;
  }
}
```

3）具体页面设置，以 `ScreenHome` 为例

在 `index.js` 中自定义当前页面路由逻辑和样式，比如 title 及其样式、在导航栏自定义按钮等，到目前为止，我们只需要简单设置 title 就好：

```js
/**
 * ScreenHome/index.js
 */

// 引入依赖略

export default class ScreenHome extends Component {
  // 自定义当前页面路由配置，后面介绍的TabNavigator也使用这个对象中的属性
  static navigationOptions = {
    // 设置 title
    title: "首页"
  };

  constructor(props) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    return view(this);
  }
}
```

在 `view.js` 中在具体元素上定义具体跳转页面

```js
/**
 * ScreenHome/index.js
 */

// 引入依赖略

export default self => (
  <View>
    <Text style={{ fontSize: 36 }}>home</Text>
    <Button
      title="goSomePage1"
      // 路由跳转
      onPress={() => self.navigation.navigate("ScreenSome1")}
    />
  </View>
);
```

经过上述配置，效果如下：

![StackNavigator效果图](http://ol9ge41ud.bkt.clouddn.com/stack_navigator.gif)

> 对于 ios 常见的需求是：登录页面是由下往上进入，而其他页面是由左至右默认进入，react navigation 只提供了全局配置页面的方式，并没提供单个页面的交互方式，但这个功能还是可以实现的，本文后半部分介绍。

## 3.2 TabNavigator 实现页面底部 tab 切换

首先在 `screens` 目录下新建 `ScreenBottomTab` 页面，用于配置 `TabNavigator`。每个 tab 对应一个页面，按需新建页面，并且新建的页面需要在 `route.js` 中进行配置，更新后的目录结构如下：

![添加tab导航后目录结构](http://ol9ge41ud.bkt.clouddn.com/tab_navigator.png)

* `ScreenBottomTab` 配置底部 tab 导航
* `ScreenTab1/2/3` 新建页面，配合底部 tab 导航

1）没有 tab 图标的最简配置

此时只需要配置 `ScreenBottomTab` 里面的 `index.js` 文件就好，如下：

```js
/**
 * ScreenBottomTab/index.js
 */

// 引入依赖略

const ScreenTab = TabNavigator(
  // 配置 tab 路由
  {
    ScreenHome: {
      screen: ScreenHome
    },
    ScreenTab1: {
      screen: ScreenTab1
    },
    ScreenTab2: {
      screen: ScreenTab2
    },
    ScreenTab3: {
      screen: ScreenTab3
    }
  },
  // 其他配置选项
  {
    tabBarPosition: "bottom"
  }
);

export default ScreenTab;
```

页面文件现在无需配置，需要注意的是 tab 下面的文字默认和在 `StackNavigator` 中定义的头部导航 title 相同。

2）自定义 tab 图标

tab 图标除了自定义外，还需要根据是否选中显示不同颜色，这可以通过配置 `TabNavigator` 的 [tabBarIcon](https://reactnavigation.org/docs/tab-navigator.html) 实现，修改的具体文件是 tab 对应页面的 `index.js` 文件。

```js
/**
 * ScreenHome/index.js
 * 局部代码
 */

static navigationOptions = {
  title: '首页',
  tabBarIcon: ({ focused }) => {
    // 根据是否选中，显示不同图片
    const icon = focused
      ? require('../../assets/images/tab_home_active.png')
      : require('../../assets/images/tab_home.png');
    return <Image source={icon} style={{ height: 22, width: 22 }} />;
  },
};
```

最终的效果如下:

![底部 tab 导航效果图](http://ol9ge41ud.bkt.clouddn.com/tab_navigator.gif)

## 3.3 单个页面实现 modal 模式的切换

对于 ios App，有的时候我们有这样的需求：页面默认从屏幕右侧进入，但某几个页面需要从屏幕下面进入，比如登录页常常有这样的登录需求。react navigation 页面进入动画默认只有全局配置，如何实现上述需求将在第二部分介绍。

# 四 自定义组件

react native 已经封装了很多常用组件，但有时我们仍然需要在次基础上进行封装，比如某些组件需要大量复用而原生组件样式或者交互逻辑不符合需求。

本项目中封装了 XgButton，XgText，XgToast，XgModal，其中有些是为了添加功能（XgButton）、有些是服用样式（XgText、XgModal）、有些则是原生组件不能实现 ios、安卓共用代码（XgToast）。

这里只介绍目录结构的调整，具体代码可参考 Github 上项目代码，因为自定义组件的需求千差万别，具体编写过程也有很多教程，这里不再具体介绍。目录结构调整如下：

![组件目录](http://ol9ge41ud.bkt.clouddn.com/define_components.png)

* `components/` 自定义组件都放这里
* `XgToast` 自定义组件具体代码

> 文件 `config/pxToDp.js` 用于尺寸自适应，在 `XgToast.js` 中有使用，第二部分详细介绍。

# 五 网络请求

react native 使用上有个最大的好处是可以不用考虑新语法兼容性的问题，既然如此，自然使用设计更加优良的 API，在网络请求方面，本项目使用[fetch API](http://bubkoo.com/2015/05/08/introduction-to-fetch/)。

添加网络请求后目录结构调整如下：

![网络请求目录](http://ol9ge41ud.bkt.clouddn.com/http_request.png)

* `xgHttp.js` 配置 fetch api
* `xgRequest.js` api 请求列表

## 5.1 配置 fetch api

`xgHttp.js`全部代码如下，里面有简单注释，这里不再详解，fetch api 的使用可以参考 [fetch API 简介](http://bubkoo.com/2015/05/08/introduction-to-fetch/)

```js
/**
 * xgHttp.js
 */

// 请求服务器host
const host = "http://api.juheapi.com";

export default async function(
  method,
  url,
  { bodyParams = {}, urlParams = {} }
) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  // 将url参数写入URL
  let urlParStr = "";
  const urlParArr = Object.keys(urlParams);
  if (urlParArr.length) {
    Object.keys(urlParams).forEach(element => {
      urlParStr += `${element}=${urlParams[element]}&`;
    });
    urlParStr = `?${urlParStr}`.slice(0, -1);
  }

  const res = await fetch(
    new Request(`${host}${url}${urlParStr}`, {
      method,
      headers,
      // 如果是 get 或者 head 方法，不添加请求头部
      body: method === ("GET" || "HEAD") ? null : JSON.stringify(bodyParams)
    })
  );

  if (res.status < 200 || res.status > 299) {
    console.log(`出错啦：${res.status}`);
  } else {
    return res.json();
  }
}
```

> 上面的配置还不完善，比如，生产环境中很多接口都有验证功能，一般是 token + 用户 id，上面的配置并没有这个功能。但现在实现这个功能还会涉及到在哪存放 token，一展开又有很多内容，缺少验证功能暂时并不影响 APP 的完整度，所以这个功能放在后文介绍。如果想先一睹为快，点这里。

## 5.2 请求 api 编写及使用

* **api 列表文件**

具体 api 请求代码我放在了 `xgRequest.js` 文件中，以 `get` 请求为例，`xgRequest.js` 代码如下：

```js
/**
 * xgRequest.js
 */

import XgHttp from "./xgHttp";

export default {
  todayOnHistory: urlPar => XgHttp("GET", "/japi/toh", { urlParams: urlPar })
};
```

其中 `"/japi/toh"` 为接口地址，这里我使用了聚合数据[历史上的今天](https://www.juhe.cn/docs/api/id/63) API。

> 再调用聚合数据[历史上的今天](https://www.juhe.cn/docs/api/id/63) API 的时候使用了我自己的 APPKEY，每天免费调用 100 次，超出后回报错`request exceeds the limit!`，如果你想进行更多的测试，注册后替换成自己的 APPKEY 就可以。

* **使用**

首先，调用接口，获取。

接口调用是在页面文件的 `index.js` 中进行的，以 `ScreenTab1/index.js` 为例：

```js
/**
 * ScreenTab1/index.js
 * 局部代码
 */

const urlPar = {
  // 大佬们，这个是我申请的聚合数据应用的key，每天只有100免费请求次数
  key: '7606e878163d494b376802115f30dd4e',
  v: '1.0',
  month: Number(this.state.inputMonthText),
  day: Number(this.state.inputDayText),
};

// 拿到返回数据后就可以进一步操作了
const todayOnHistoryInfo = await XgRequest.todayOnHistory(urlPar);
```

然后，展示数据。

拿到数据以后就可以在做进一步操作了，一般就是在页面中展示了。react 是数据驱动的框架，对于动态变化的展示数据一般是放在 react native 的 `state` 对象中，`state` 一经改变，便会触发 `render()` 函数重新渲染 DOM 中变化了的那部分。

首先是在 `index.js` 中把需要动态展示的数据先写入 `state`：

```js
/**
 * ScreenTab1/index.js
 * 局部代码
 */

// 将需要动态更新的数据放入 state
this.state = {
  todayOnHistoryInfo: {}
};
```

然后在 `view.js` 中读取 `state` 中的数据：

```js
/**
 * ScreenTab1/view.js
 * 局部代码
 */

{
  /* 查询 */
}
<Button title="查询" onPress={() => self.getTodayOnHistoryInfo()} />;

{
  /* 展示查询数据 */
}
<Text>
  发生了啥事：{self.state.todayOnHistoryInfo.result
    ? self.state.todayOnHistoryInfo.result[0].des
    : "暂无数据"}
</Text>;
```

上述 `view.js` 中的代码主要做两件事：发送调用指令，展示返回数据。

最终的效果图如下：

![网络请求效果](http://ol9ge41ud.bkt.clouddn.com/network.gif)

# 六 集成 redux

在 App 中有一些全局状态是所有页面共享的，比如登录状态，或者账户余额（购买商品后所有展示余额的页面都要跟着更新）。在本项目中，使用 [Redux](https://redux.js.org/) 进行状态管理。

引入 redux 后后目录结构调整如下：

![redux目录](http://ol9ge41ud.bkt.clouddn.com/redux.png)

* `redux` 存放 redux 相关配置文件
* `actions.js` redux action
* `reducers.js` redux reducer
* `store.js` redux store

> 如果对 redux 毫无概念，可以看下这篇文章 [Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

[Redux](https://redux.js.org/) 实际上是非常难用的，，，如果之前使用过 [vuex](https://vuex.vuejs.org/)，在使用 Redux 的过程中，会发现需要自己配置的东西太多（这里没有好坏之分，不想引战，自己的使用感受而已），为了简化 Redux 的操作， Redux 作者开发了 [react-redux](https://github.com/reactjs/react-redux)，虽然使用的便捷性上还没法和 vuex 比，但总算是比直接使用 Redux 好用很多。

在集成 Redux 进行状态管理之前我们先思考一个问题：集成过程中难点在哪？

因为在一个 App 中 Redux 只有一个 Store，这个 Store 应该为所有（页面）组件共享，所以，集成的难点就是**如何使所有（页面）组件可以访问到这个唯一的 store，并且可以触发 action**。为此，redux-react 引入了 `connect`函数 和 `Provide`组件，他们必须配合使用才能实现 redux 的集成。

通过这 `connect` 和 `Provide` 实现 store 在组件间共享的思想是：

1. Redux store 可以（注意是“可以”，并不是“一定”，需要配置，见第 2 条）对 `connect` 方法可见，所以在组件中可以通过调用 `connect` 方法实现对 store 数据的访问；
2. 实现 Redux store 对 `connect` 的可见的前提条件是，**需要保证这个组件为 `Provide` 组件的子组件**，这样通过将 store 作为 `Provide` 组件的 props，就可以层层往下传递给所有子组件；
3. 但子组件必须通过 `connect` 方法实现对 store 的访问，而无法直接访问。

## 6.1 引入依赖

首先是安装依赖 redux，react-redux：

```bash
yarn add redux react-redux
```

## 6.2 配置 redux

这里指的是配置 `actions`, `reducers` 和 `store`。

> 据说应用大了，最好将 redux 分拆，但现在项目还小，暂时没有做拆分。

* 配置 `actions`

```js
/**
 * actions.js
 */

export function setUserInfo(userInfo) {
  return {
    // action 类型
    type: "SET_USER_INFO",

    // userinfo 是传进来的参数
    userInfo
  };
}
export function clearReduxStore() {
  return {
    type: "CLEAR_REDUX_STORE"
  };
}
```

* 配置 `reducers`

```js
/**
 * reducers.js
 */

import { initialState } from "./store";

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      // 合并 userInfo 对象
      action.userInfo = Object.assign({}, state.userInfo, action.userInfo);

      // 更新状态
      return Object.assign({}, state, { userInfo: action.userInfo });
    case "CLEAR_REDUX_STORE":
      // 清空 store 中的 userInfo 信息
      return { userInfo: {} };
    default:
      return state;
  }
}

export default reducer;
```

注意 `SET_USER_INFO` 这条路径下的代码，使用了 `Object.assign()`。这是因为 `reducer` 函数每次都会返回全新的 `state` 对象，**这意味着如果 `state` 对象含有多个属性而在 `reducer` 函数返回时没有合并之前的 `state`，可能会导致 `state` 对象属性丢失**。

这是一个很常见的错误，因为通常我们在触发 `actions` 时只需要传入更改的那部分 `state` 属性，而不是将整个 `state` 再传一遍。

> redux 经典计数器教程在触发 `state` 变化时通常这样写 `return { defaultNum: state.defaultNum - 1 };`，因为计数器例子中只有一个属性，即 `defaultNum`，所以合并之前的 `state` 就没有意义了，但生产环境中的应用 `state` 对象中往往不止一个属性，此时上述的写法就会出错。

* 配置 `store`

```js
/**
 * store.js
 */

import { createStore } from "redux";
import reducers from "./reducers";

// 定义初始值
const initialState = {
  userInfo: {
    name: "小光",
    gender: "男"
  }
};

const store = createStore(reducers, initialState);

export default store;
```

## 6.3 组件中使用

配置完 redux，接下来就是使用了。

* 配置 `index.js`

在配置 `index.js` 中 主要是配置 `Provide` 作为根组件，并传入 `store` 作为其属性，为接下来组件使用 redux 创造条件。

```js
/**
 * index.js
 */

import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import store from "./src/redux/store";

const ReduxApp = () => (
  // 配置 Provider 为根组件，同时传入 store 作为其属性
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("AwesomeProject", () => ReduxApp);
```

* 配置组件

这里以 `ScreenTab2` 为例：

首先，在 `index.js` 中关联 redux

```js
/**
 * ScreenTab2/index.js
 * 只列出涉及 redux 的代码
 */

// ...

// redux 依赖
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../../redux/actions";

// ...

changeReduxStore(userInfo) {
  // 设置 redux store，相当于 dispatch，这里触发 actions 中的 'SET_USER_INFO'
  this.props.setUserInfo(userInfo);
}

// ...

// 将 store 中的状态映射（map）到当前组件的 props 中，这样才能在该组建中访问 redux state
function mapStateToProps(state) {
  return { userInfo: state.userInfo };
}

// 将 actions 中定义的方法映射到当前组件的 props 中，这样才能在该组建中触发 action
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

// 将 store 和 当前组件连接（connect）起来
export default connect(mapStateToProps, mapDispatchToProps)(ScreenTab2);
```

然后，就是在 view 中控制具体改变的数据

```js
/**
 * ScreenTab2/view.js
 * 只列出涉及 redux 的代码
 */

<Button title="改变名字" onPress={() => self.changeReduxStore({ name: 'vince' })} />
<Button title="改变性别" onPress={() => self.changeReduxStore({ gender: '女' })} />
<Button title="还原" onPress={() => self.changeReduxStore({ name: '小光', gender: '男' })} />
```

最终效果图如下：

![集成redux后效果](http://ol9ge41ud.bkt.clouddn.com/redux_gif.gif)

## 6.4 持久化存储

手机 App 一般都有这样的需求：**除非用户主动退出，不然即便 App 进程被杀死，App 重新打开后登录信息依旧会保存**。

在本项目中，为了便于各组件共享登录状态，我把登录状态写在了 redux store 中，但原生 redux 有个特性：页面刷新后 redux store 会回恢复初始状态。为了达到上述需求，就需要考虑 redux store 持久化存储方案。本项目中使用了 [redux-persist](https://github.com/rt2zz/redux-persist)，下面介绍如何配置：

* 引入依赖

```bash
yarn add redux-persist
```

* 修改 redux 配置

1）修改 `store.js`。

除了引入 `redux-persist` 外，这里使用了 react native 提供的 [AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html) 作为持久化存储的容器。另外，初始化 `state` 移到了 `reducers.js` 中。

```js
/**
 * store.js
 * 更改为持久化存储
 */

import { createStore } from "redux";

// 引入 AsyncStorage 作为存储容器
import { AsyncStorage } from "react-native";

// 引入 redux-persist
import { persistStore, persistCombineReducers } from "redux-persist";

import reducers from "./reducers";

// 持久化存储配置
const config = {
  key: "root",
  storage: AsyncStorage
};

const persistReducers = persistCombineReducers(config, {
  reducers
});

const configureStore = () => {
  const store = createStore(persistReducers);
  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;
```

2）修改 `reducers.js`

只是将初始化 `state` 移入。至于为什么要将初始化 `state` 从 `store.js` 移入 `reducers.js` 实在是无奈之举：不然在 `store.js` 中创建 `store` 报错，后续再填坑，暂时先放在 `reducers.js` 中。

```js
/**
 * reducers.js
 * 更改为持久化存储
 */

// 初始化 state 放在这里
const initialState = {
  userInfo: {
    name: "小光",
    gender: "男"
  }
};

function reducers(state = initialState, action) {
  // ... 代码未修改
}

export default reducers;
```

* 修改使用 redux 的文件

1）修改根目录下的 `index.js`：

```js
/**
 * index.js
 * 更改为持久化存储
 */

// ... 代码未修改

import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./src/redux/store";

const { persistor, store } = configureStore();

const ReduxApp = () => (
  // 配置 Provider 为根组件，同时传入 store 作为其属性
  <Provider store={store}>
    {/* redux 持久化存储 */}
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// ... 代码未修改
```

2）因为修改为持久化存储的过程过程中把初始化的 `state` 存在了 `reducers.js` 中，所以在页面组件映射 `state` 到当前页面时需要还需要修改对应属性的引入地址，依然以 `ScreenTab2` 为例：

```js
/**
 * ScreenTab2/index.js
 * 更改为持久化存储
 */

// 修改前
function mapStateToProps(state) {
  // 引用 state.userInfo
  return { userInfo: state.userInfo };
}

// 修改后
function mapStateToProps(state) {
  // 引用 state.reducers.userInfo
  return { userInfo: state.reducers.userInfo };
}
```

经过上述修改，便可以实现 redux 的持久化存储：初始化姓名是 `小光`，更改为 `vince` 后重新加载页面，姓名还是 `vince`（而非初始状态 `小光`）。效果图如下：

![redux持久化存储](http://ol9ge41ud.bkt.clouddn.com/persist_redux.gif)

# 七 第一部分小结

经过第一部分介绍，App 框架基本构建完成，在第二部分主要讨论 UI/交互以及 react native 常用组件，具体内容包括：

* 在使用 react navigation 的前提下，**实现单个页面从下往上（modal）的进入动画**
* 尺寸自适应
* 更换桌面图标和启动页
* 打包发布
* 实现策略（主要是安卓）
* 常用组件介绍，比如下拉刷新、alert、列表渲染、WebView 等

# 参考资料
待补充