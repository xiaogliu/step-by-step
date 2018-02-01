# 为什么写这篇文章

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

> 在 [step_by_step/other/react/react_native/](https://github.com/xiaogliu/step_by_step/tree/master/other/react/react_native) 详细记录了我在使用 React Native 开发过程中遇到的问题及解决方案，就是稍显啰嗦，有兴趣可以看下。（PS.仓库 [step_by_step](https://github.com/xiaogliu/step_by_step) 主要记录日常所学，也有很多有趣的东西呢，比如 [通过AI玩微信跳一跳游戏环境配置](https://github.com/xiaogliu/step_by_step/blob/master/python/2.%E9%80%9A%E8%BF%87AI%E7%8E%A9%E5%BE%AE%E4%BF%A1%E8%B7%B3%E4%B8%80%E8%B7%B3%E6%B8%B8%E6%88%8F%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE.md)，欢迎 star，嘿嘿嘿）   

## 官方 Demo 目录介绍

良好的目录结构有助于今后的开发及维护，本文后半部分每添加新功能，除了代码部分，如果目录结构有变，还会着重指出。首先，让我们看下官方 Demo 的目录结构：   

blabla

# 配置路由

重点 react navigation，详细使用另写一篇文章。着重介绍如何单独设置某个页面的样式，看内容，太长的话另开文章。    

# 自定义组件

Text，Button，Toast，Modal

本文不展开，详细的另写一片文章。

# 集成 redux    

# 打包发布   

整理常见问题，直接贴出文章地址。   

# 常见需求及 React Native 解决方案

## 自适应（宽高及字体大小）

## 下拉刷新


# 待优化部分   

目前 APP 还在不断优化、完善中，有新进度会及时更新，欢迎讨论交流。      

