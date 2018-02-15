# 为什么写这篇文章

（最后发现文章越写越长，为了提高阅读体验，分为 N 部分）

最开始接到公司通知要开发 React Native APP 的时候，很兴奋，因为之前的技术栈主要是 Vue 和 Angular，虽然一只想学 React，但都是自己私下写几个 Demo，没有实际项目的沉淀心里总是没谱。    

另一方面，公司给的开发时间很短，从设计需求到第一版送审只给了一个月时间。鉴于之前 Vue 开发的经验（即便不是很熟悉的情况下也可以通过把官网 Demo 撸下来改改就能上线，功能及性能优化可以后续不断完善）以及业务 API 90%以上都可以和官网共用，一个月的时间当时想着绰绰有余。   

但，实际开发过程却踩了很多坑。   

首先，难以找到一个开箱即用的 React Native APP Demo。目前存在的 Demo 要么过于简单，比如 React Native 官网提供的 Demo [AwesomeProject](https://facebook.github.io/react-native/docs/getting-started.html) ，这个 Demo 如其出现的位置，确实只适合 getting start，对于用于生产环境的 APP 所需要的路由（导航组件）、状态管理等，并没有给出最佳实践。虽说 React Native 教程中对于复杂应用应如何选择组件都有所提及，但并没有给出完整示例。而另一方面，又有很多 [React Native APP](https://github.com/ReactNativeNews/React-Native-Apps) 虽已开源，但都是用于特定场合的完整 APP，有些 APP 的目录结构本身就不友好，并且也没有完整的说明文档，并不适合学习或者拿来改改用于生产。   

那就自己开发呗。但，依然存在很多坑，典型如“如何集成 Redux 进行状态管理”，单独介绍 Redux 的文章很多，对于如何集成 Redux 到 React Native 中的文章也有，但这些文章往往是介绍了 Redux 最为基本的用法而没有提供集成后的 Demo，而 Redux 本身又有很多细节需要注意（比如状态管理在触发改变的时候是返回新的 status store，如果之前的 store 中有多个属性，而自己写 reducer 的时候不注意，很容易用一个新的属性将 store 中其他所有属性删除，细节后面讲），如果对于 Redux 了解不深，很容易就踩坑里。    

还有很多其他细节，比如如何处理安卓的状态栏？在使用 react navigatin 的情况下，如何单独处理某一个页面的交互方式（比如 iOS 页面默认从左往右进入，而登录页面要求从下往上）。   

基于以上原因，在自己使用 React Native 开发的 APP 上线以后，决定写篇文章详细介绍如何从零开始，开发一个可用于生产的 React Native APP。一方面自己做下总结，另外也许可以帮助其他人少踩坑。    

这里的“零”指的是没有使用过 React Native，甚至 React 都不是很熟，但最好有使用 Vue 或者 Angular 的经历，没有也没关系，只要知道如何使用 npm（yarn）、如果根据官方文档写 Demo 也可以。    

此外，如果要开发 iOS 应用并发布到 APP Store 必须使用 xCode 并有 Apple 开发者账号。   

首先放出 Demo 地址。如果你急于开发，可以直接 clone 下来稍微改下应该就可发布；如果你时间充裕，或者使用过程遇到问题，可以查看下面的文章了解下这个 Demo 如何实现的，或者在 github 上提 isuue。    

> 提醒下，如果直接用于生产，这个 Demo 还有很多待完善的地方，比如，随着应用状态的不断增加，如何拆分 redux；比如对于高分屏，在安卓、iOS共用代码的情况下如何更好展示图片，这些问题并没有在这个 Demo 中解决，这个 Demo 的定位是一个完整、够用但不完美的 Demo。

# 官方 Demo 下载及介绍   

官方 demo 虽然不完整，但却是一个很好的开始。介绍完官方 Demo（包括环境配置），后文会一步步介绍如何从这个不完整的官方 Demo 改造成可用于生产的 APP。

## 环境配置

下载官方 Demo：AwesomeProject，然后运行。   

所需的环境配置[官方文档](https://facebook.github.io/react-native/docs/getting-started.html)讲的很清楚，这里不在赘述。需要指出的是 React Native 对于运行 Demo 提供了两种方法：一种是在 [Expo](https://expo.io/) 客户端中运行，另一种是编译成原生代码（安卓编译成 Java，iOS 编译成objective-C）后在模拟器或者在真机上运行。推荐直接使用第二种，如果想发布 APP 这也是绕不过去的。   

如果之前没有开发过原生 APP，还需要熟悉下原生 APP 的开发工具：安卓使用 [Android Studio](https://developer.android.com/studio/index.html)，iOS 使用 [Xcode](https://developer.apple.com/support/xcode/)。它们如何配合 React Native 使用在 [官方文档](https://facebook.github.io/react-native/docs/getting-started.html)有说明，这部分没有太多坑，遇到问题自行谷歌一般都有解决方案。    

需要说明的是 Android Studio 很多依赖更新需要访问谷歌服务，所以请自备科学上网工具。另外，为了照顾不同阶段的开发者，我还是将环境配置过程中可能遇到的问题汇总到了这里，如果配置过程出现问题，不妨先去这篇文章中搜索下看有没有解决方案。如果再有问题，欢迎通过留言、邮件等各种方式讨论。    

> 在 [step_by_step/other/react/react_native/](https://github.com/xiaogliu/step_by_step/tree/master/other/react/react_native) 详细记录了我在初次使用 React Native 过程中遇到的问题及解决方案，因为以记录为目的，所以稍显啰嗦，有兴趣可以看下。     

## 官方 Demo 目录介绍

良好的目录结构有助于今后的开发及维护，本文后半部分每添加新功能，除了代码部分，如果目录结构有变，还会着重指出。首先，让我们看下官方 Demo 的目录结构：   

![AwesomeProject 目录结构](http://ol9ge41ud.bkt.clouddn.com/aw_content.jpeg)

上面的目录结构说明如下，重要的有：

- `android/` android 原生代码（使用 android studio 要打开这个目录，如果直接打开父目录报错）
- `ios/` ios 原生代码（使用 xcode 打开这个目录，如果直接打开父目录报错）
- `index.js` 打包 app 时进入 react native（js部分） 的入口文件（0.49 以后安卓、ios共用一个入口文件）
- `App.js` 可以理解为 react native（js部分） 代码部分的入口文件，比如整个项目的路由在这里导入

上面是最重要的四个目录/文件，其他说明如下：   

- `_test_/` 测试用（暂未使用）
- `app.json` 项目说明，主要给原生app打包用，包括项目名称和手机桌面展示名称 [React Native : 0.41 app.json](https://stackoverflow.com/questions/42409459/react-native-0-41-app-json)   
- `package.json` 项目依赖包配置文件
- `node_modules` 依赖包安装目录
- `yarn.lock` yarn 包管理文件
- 其他配置文件暂时无需改动，在此不做说明

# 准备工作

开始改造代码之前，推荐先安装通过 eslint 和 prettier 作为自动格式化代码的工具，这样可以确保自己写的代码始终如一。   

首先安装依赖：   

```bash
yarn add eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-import babel-eslint eslint-config-airbnb prettier-eslint --dev
```

在根目录下配置 `.eslintrc`（如果没有这个文件，新建）：

```json
{
  "parser": "babel-eslint",
  "extends": "airbnb",
  "ecmaFeatures": {
    "classes": true
  },
  "plugins": ["react", "jsx-a11y", "import"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0,
    "global-require": 0
  }
}
```

# 配置路由

这里使用 [react navigation](https://reactnavigation.org/docs/getting-started.html) 管理路由，大而全的介绍或者原理说明不是这部分的重点，这里主要讲怎么用。    

react navigation 常用 API 有三个：   

- `StackNavigator`：页面间跳转，每次跳转后都会将前一个页面推入返回栈，需要返回上个页面特别好用
- `TabNavigator`：顶部或底部 tab 跳转，一般在底部使用
- `DrawerNavigator`：侧滑导航

最为常用的是前两个，接下来也只介绍前两个的使用。   

## StackNavigator 实现页面间跳转

**首先我们要调整下目录结构**，调整后的结构如下：   

![AwesomeProject 目录结构](http://ol9ge41ud.bkt.clouddn.com/aw_content.jpeg)

- `src/` 放置所有原始的 react native 代码
- `config/` 配置文件，比如路由配置
- `route.js` 路由配置文件
- `screens/` 所有页面文件
-  `ScreenHome/` 这个目录是放具体页面文件的，为了进一步关注代码分离，里面又分为三个文件：`index.js` 中包含逻辑部分，`style.js` 中包含样式部分；`view.js` 中包含视图或者说页面元素部分。其他页面文案结构与此相同。   

> 注意页面文件的命名方式：大驼峰命名法，react native 推荐组件命名用大驼峰命名法，每个页面相当于一个组件。   

简单介绍了 react navigation 下面进行具体改造:    

1，首先配置路由：路由文件 `route.js` 此时内容如下，这也是 `StackNavigator` 最简单的使用方式：   

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
const AppNavigator = StackNavigator(
  {
    ScreenHome: {
      screen: ScreenHome
    },
    ScreenSome1: {
      screen: ScreenSome1
    },
  },
);

export default () => <AppNavigator />;
```

2，更新 `App.js`，对接路由文件：   

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

3，具体页面设置，以 `ScreenHome` 为例   

在 `index.js` 中自定义当前页面路由逻辑和样式，比如title及其样式、在导航栏自定义按钮等，到目前为止，我们只需要简单设置title就好：   

```js
/**
 * ScreenHome/index.js
 */

// 引入依赖略

export default class ScreenHome extends Component {
  // 自定义当前页面路由配置，后面介绍的TabNavigator也使用这个对象中的属性
  static navigationOptions = {
    // 设置 title
    title: "首页",
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
    <Text style={{fontSize: 36}}>home</Text>
    <Button
      title="goSomePage1"

      // 路由跳转
      onPress={() => self.navigation.navigate("ScreenSome1")}
    />
  </View>
);
```

经过上述配置，效果如下：   

![AwesomeProject 目录结构](http://ol9ge41ud.bkt.clouddn.com/aw_content.jpeg)   

> 对于 ios 常见的需求是：登录页面是由下往上进入，而其他页面是由左至右默认进入，react navigation 只提供了全局配置页面的方式，并没提供单个页面的交互方式，但仍然有一种这种的方案可以实现，在下部分写登录页面的时候介绍。   

## TabNavigator 实现页面底部 tab 切换

首先在 `screens` 目录下新建 `ScreenBottomTab` 页面，用于配置 `TabNavigator`。每个 tab 对应一个页面，按需新建页面，并且新建的页面需要在 `route.js` 中进行配置，更新后的目录结构如下：   

![AwesomeProject 目录结构](http://ol9ge41ud.bkt.clouddn.com/aw_content.jpeg)    

- `ScreenBottomTab` 配置底部 tab 导航
- `ScreenTab1/2/3` 新建页面，配合底部 tab 导航

1，没有 tab 图标的最简配置

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
    tabBarPosition: "bottom",
  }
);

export default ScreenTab;
```

页面文件现在无需配置，需要注意的是 tab 下面的文字默认和在 `StackNavigator` 中定义的头部导航 title 相同。   

2，自定义 tab 图标    

tab 图标除了自定义外，还需要根据是否选中显示不同颜色，这可以通过 `tabBarIcon` 实现。   

首先



# 首先建立独立页面，方便后续管理

重点 react navigation，详细使用另写一篇文章。着重介绍如何单独设置某个页面的样式，看内容，太长的话另开文章。    

# 自定义组件

Text，Button，Toast，Modal

本文不展开，详细的另写一片文章。

# 集成 redux    

# 网络请求   

# 启动页/桌面图标

# 升级策略

# 打包发布   

整理常见问题，直接贴出文章地址。   

# 常见需求及 React Native 解决方案

## 自适应（宽高及字体大小）

## 下拉刷新


# 待优化部分   

目前 APP 还在不断优化、完善中，有新进度会及时更新，欢迎讨论交流。      

