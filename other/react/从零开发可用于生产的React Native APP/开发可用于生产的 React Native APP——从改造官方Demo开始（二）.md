经过第一部分介绍，App 框架基本构建完成，这部分主要讨论 UI/交互以及 react native 常用组件，具体内容包括：

# 一 扩展 react navigation

这里的扩展指的是实现**可单独配置页面的进入方式**（[react navigation](https://reactnavigation.org/docs/stack-navigator.html) 默认只支持全局配置，要么 `card`，要么 `modal`，配置后所有页面进入动画相同）。

实现上述效果需要做两方面修改：`StackNavigator` API（在 `route.js` 中使用）和 进入某个页面是的调用方式。

## 1.1 修改 `StackNavigator` API

修改后如果使页面默认状态为 card，只需要输入对应页面即可，比如 `..navigate('ScreenSome1')`；如果要使某个页面进入方式为 modal 只需要在路径上加上 Modal 比如：`..navigate('ScreenSome2Modal')`。

需要注意的是**如果页面进入方式为 modal，需要自定义 header，因为默认 header 样式失效，都叠在一块了**。

```js
/**
 * route.js
 * 自定义 StackNavigator，可以选择 screen 进入方式
 */

// ... 其他代码略

const StackModalNavigator = (routeConfigs, navigatorConfig) => {
  const CardStackNavigator = StackNavigator(routeConfigs, navigatorConfig);
  const modalRouteConfig = {};
  const routeNames = Object.keys(routeConfigs);

  for (let i = 0; i < routeNames.length; i++) {
    modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
  }

  const ModalStackNavigator = StackNavigator(
    {
      CardStackNavigator: { screen: CardStackNavigator },
      ...modalRouteConfig
    },
    {
      // 如果页面进入方式为 modal，需要自定义 header（默认 header 样式失效，都叠在一块了）
      mode: "modal",
      headerMode: "none"
    }
  );

  return ModalStackNavigator;
};

// 设置路由
const AppNavigator = StackModalNavigator();
// ... 其他代码略
```

## 1.2 页面中调用

首先我们新建页面 `ScreenSome2`，接下来就让它以 modal 的形式进入（从屏幕下面进入），作为对比 `ScreenSome1` 以 `card` 的形式进入（默认进入方式，从屏幕右侧进入）。

因为以 modal 形式进入的页面需要自定义 header，一般只是一个关闭按钮，以 `ScreenSome2` 为例：

```js
/**
 * ScreenSome2/view.js
 * 自定义 header（关闭按钮）
 */

// 其他代码略

<View>
  {/* TouchableHighlight 为关闭按钮的热区 */}
  <TouchableHighlight
    onPress={() => self.navigation.goBack()}
    underlayColor="transparent"
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: pxToDp(30),
      width: pxToDp(150),
      height: pxToDp(90),
      backgroundColor: "yellow"
    }}
  >
    <Text style={{ marginLeft: pxToDp(24) }}>关闭</Text>
  </TouchableHighlight>

  <Text style={{ fontSize: pxToDp(36) }}>some2，以 modal 的形式进入</Text>
</View>

// 其他代码略
```

然后就是更改进入 `ScreenSome2` 代码，这里是 `ScreenHome` 页面中的代码：

```js
/**
 * ScreenHome/view.js
 * 自定义 header（关闭按钮）
 */

// 其他代码略

{
  /* ScreenSome2 从屏幕右侧进入 */
}
<Button
  title="goSome1"
  onPress={() => self.navigation.navigate("ScreenSome1")}
/>;

{
  /* ScreenSome2 从屏幕下面进入 */
}
<Button
  title="goSome2Modal"
  onPress={() => self.navigation.navigate("ScreenSome2Modal")}
/>;

// 其他代码略
```

最终效果图：
![自定义页面进入动画](http://ol9ge41ud.bkt.clouddn.com/nav_diff_entry.gif)

# 二 自适应

自适应主要包括两方面：尺寸根据屏幕大小自适应，包括 `fontSize`，`width` 等；图片分辨率根据屏幕分辨率自适应，也就常说的二倍图、三倍图等。

## 2.1 尺寸自适应

尺寸自适应的原理是通过获取手机屏幕的宽度，尺寸做相应比例的调整，为此封装了一个工具函数，放在了 `config/pxToDp.js` 中。

调整后的目录如下：

![尺寸转换函数目录](http://ol9ge41ud.bkt.clouddn.com/px_to_dp.png)

* `config/pxToDp.js` 尺寸转换的工具函数

> 尺寸转换的工具函数在第一部分已经添加

1）编写自适应尺寸工具函数

因为所有涉及尺寸的数据都要转换（`fontSize`，`width`等），所以对转换后的数据要做处理，保证：1.大于等于 1 的数字向上取整；2.小于 1 的数字，如果是 ios 平台统一设为 0.5；如果是安卓平台统一设为 1（因为安卓平台分辨率千差万别万别，低分辨率的屏幕显示 0.5 的尺寸会有锯齿状）。工具函数完整代码如下：

```js
/**
 * pxToDp.js
 * 自适应布局
 * @param uiElementPx: ui给的原始尺寸
 */

import { Dimensions, Platform } from "react-native";

// app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get("window").width;

// UI 默认给图是 750
const uiWidthPx = 750;

function pxToDp(uiElementPx) {
  const transferNumb = uiElementPx * deviceWidthDp / uiWidthPx;

  if (transferNumb >= 1) {
    // 避免出现循环小数
    return Math.ceil(transferNumb);
  } else if (Platform.OS === "android") {
    // 如果是安卓，最小为1，避免边框出现锯齿
    return 1;
  }
  return 0.5;
}

export default pxToDp;
```

> 实际上，通过 `Dimensions.get('window').width` 获取的屏幕宽度和自己想象的可能有出入，比如，iphone7 屏幕 4.7''，货渠道的宽度是 `375`，华为 P9 是 5.2'，但获取到的宽度却是是 `360`！有点坑，原因待补充。

2）使用自适应尺寸工具函数

使用方法很简单，在需要转换单位的组件中将转换尺寸的工具函数引入，将需要转换的尺寸传入工具函数即可，以 `ScreenHome` 为例：

```js
/**
 * ScreenHome/view.js
 */

// ... 其他代码略

// 引入尺寸转换工具函数
import pxToDp from "../../config/pxToDp";

// ... 其他代码略

// 将需要转换的单位传入 pxToDp 中
<Text style={{ fontSize: pxToDp(36) }}>home</Text>;

// ... 其他代码略
```

## 2.3 图片分辨率自适应

手机分辨率越来越多，尤其安卓，React Native 可以根据不同分辨率加载不同尺寸的图片，只需在图片命名上面加以区分。

* 提供不同分辨率的图片

比如我们有张图片叫 `test.png`，尺寸为 `40 x 40`（单位像素），为了做到自适应屏幕分辨率，我们还需要提供它的 2 倍图，3 倍图，这样，一张图片就对应 3 个尺寸，如下：

```bash
# 一张图片提供 3个尺寸

test.png # 尺寸 40 x 40
test@2x.png # 尺寸 80 x 80
test@3x.png # 尺寸 120 x 120
```

`name@nx`是 n (n > 1) 倍图命名规范，React Native 也是根据命名判断图片尺寸的。

* 使用

在饮用图片的时候直接使用 **不加倍率后缀的图片名**，比如，直接使用 `test.png`，如下：

```js
/**
 * ScreenTab3/view.js
 */

<Image
  source={require("../../assets/images/test.png")}
  style={{ height: pxToDp(80), width: pxToDp(80) }}
/>
```

最终效果图如下：

* iphone6： 2 倍图（图片放大后可以看到里面有 `2X` 字样）
* iphone7Plus：3 倍图（图片放大后可以看到里面有 `3X` 字样）
* Nexus4：2 倍图
* Pixel2：3 倍图

![自定加载不同分辨率图片](http://ol9ge41ud.bkt.clouddn.com/autod_pic.png)

# 三 修改桌面图标、App 展示名称，设置启动页

修改桌面图标、App 展示名称相对简单，设置启动页稍微麻烦。另外，iOS 修改桌面图标、App 展示名称，设置启动页都需要在 Xcode 中进行。

## 3.1 设置桌面图标

因为 App 图标对应多个尺寸，手动改写太麻烦，这个网站可以自动生成 [MakeAppIcon](https://makeappicon.com/)。

> 并不是所有尺寸的图片都需要，见下文。

* iOS

准确点讲不能叫设置桌面图标，而应该是 App 图标，因为我们需要设置的不止有桌面展示的图标，还有设置时 app 图标、消息推送时 app 图标，此外如果要发布到 App store，还需要设置 Apple Store 展示用的 App 图标。

1）图片准备

以上不同地方用到的 app 图标尺寸各不相同，具体如下（**只针对 iphone，不包括 ipad，iwatch**）：

| 尺寸      | 名称                 | 用途                | 是否必须         |
| --------- | -------------------- | ------------------- | ---------------- |
| 120x120   | Icon-60@2x.png       | 桌面图标 (2x)       | 必须             |
| 180x180   | Icon-60@3x.png       | 桌面图标 (3x)       | 可选，但推荐设置 |
| 80x80     | Icon-40@2x.png       | Spotlight 图标 (2x) | 可选，但推荐设置 |
| 120x120   | Icon-40@3x.png       | Spotlight 图标 (3x) | 可选，但推荐设置 |
| 58x58     | Icon-29@2x.png       | 设置图标 (2x)       | 可选，但推荐设置 |
| 87x87     | Icon-29@3x.png       | 设置图标 (3x)       | 可选，但推荐设置 |
| 40x40     | Icon-20@2x.png       | 通知图标 (3x)       | 可选，但推荐设置 |
| 80x80     | Icon-20@3x.png       | 通知图标 (3x)       | 可选，但推荐设置 |
| 1024x1024 | iTunesArtwork@2x.png | App Store (2x)      | 必须             |

> 名称不是说一定要和上面相同，但 `Icon` 、尺寸（如 `60`）还有倍率（@nx）要有，类型为 `png`。

2）将图片拖放至 Xcode 指定位置，具体是：`Project Navigator -> Images.xcassets -> AppIcon`，如下图

![iOS AppIcon](http://ol9ge41ud.bkt.clouddn.com/ios_app_icon.png)

> 拖放完成后，通过文件管理器查看项目目录，也会发现相应图片。

* 安卓

安卓的 app 图标相对简单，只需要设置桌面图标。设置位置在 `yourApp/android/app/src/main/res/` 目录下，这个目录默认有四个文件夹，里面各对应放置了一种尺寸的桌面图标图片，图片尺寸不同，但名称相同，统一为 `ic_launcher.png`，具体如下所示：

| 文件夹名称     | 含义                               | 文件夹内部图片尺寸 | 文件夹内部图片名称 |
| -------------- | ---------------------------------- | ------------------ | ------------------ |
| mipmap-ldpi    | Low Density Screen，120 DPI        | 36x36              | ic_launcher.png    |
| mipmap-mdpi    | Medium Density Screen, 160 DPI     | 48x48              | ic_launcher.png    |
| mipmap-hdpi    | High Density Screen, 240 DPI       | 72x72              | ic_launcher.png    |
| mipmap-xhdpi   | Extra-high density screen, 320 DPI | 96x96              | ic_launcher.png    |
| mipmap-xxhdpi  | xx-high density screen, 480 DPI    | 144x144            | ic_launcher.png    |
| mipmap-xxxhdpi | xxx-high density screen, 640 DPI   | 192x192            | ic_launcher.png    |

如果你使用了 MakeAppIcon 的服务，直接将对应文件夹全部放入 `res/` 目录下就好，不然就手动替换图标。

> 可以根据实际需求删除不必要的文件，比如，120 DPI 的屏幕很少了，那么这个文件夹就可以不要

## 3.2 修改 App 展示名称

* iOS

调出工程设置菜单（双击工程名称或者单击然后然后右侧选择 Targets --> yourProject），进入 `info` 选项，在 `Custom iOS Target Properties` 中添加 `Bundle display name`，其 `value` 便是 App 的名称。具体设置如下图：

![ios修改app名称](http://ol9ge41ud.bkt.clouddn.com/ios_app_name.png)

* 安卓

安卓修改 App 展示名称在这个文件中 `yourApp/android/app/src/main/res/values/strings.xml`。

`strings.xml` 这个文件很简单，全部内容如下：

```html
<resources>
    <string name="app_name">你的app名称</string>
</resources>
```

替换 `你的app名称` 为你想要的名字就好。

## 3.3 设置启动页

这里使用了第三方插件[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen/)，官网教程已经很详细，这里做简要介绍。

* 项目中安装

1）下载依赖

```bash
yarn add react-native-splash-screen
```

2）添加到项目中

```
react-native link react-native-splash-screen
```

* iOS 设置

1）更新 `AppDelegate.m`：

```c
#import "AppDelegate.h"
#import "RCTRootView.h"
#import "SplashScreen.h"  // 导入启动页插件

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...其他代码

    [SplashScreen show];  // 显示启动页
    return YES;
}

@end
```

# 四 打包发布

## 4.1 ios 打包发布

## 4.2 安卓打包发布

# 五 升级策略

* 实现策略（主要是安卓）

# 六 React Native 常用组件介绍

看下能否实现下拉自动加载？WebView

# 七 待优化部分

比如自适应尺寸方案不尽完美，某些安卓手机获取到的宽度错误；比如如果页面以 modal 的形式进入，那么再也切换不到 card 模式；再比如如何实现增量更新、如何

# 参考资料

[React Native 开发适配心得](http://www.devio.org/2017/10/06/How-to-develop-a-React-Native-application-for-Android-and-iOS-dual-platforms/)
[Apple Developer - App Icon](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/app-icon/)
