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

| 文件夹名称     | 含义                      | 文件夹内部图片尺寸 | 文件夹内部图片名称 |
| -------------- | ------------------------- | ------------------ | ------------------ |
| mipmap-ldpi    | Low Density Screen        | 36x36              | ic_launcher.png    |
| mipmap-mdpi    | Medium Density Screen     | 48x48              | ic_launcher.png    |
| mipmap-hdpi    | High Density Screen       | 72x72              | ic_launcher.png    |
| mipmap-xhdpi   | Extra-high density screen | 96x96              | ic_launcher.png    |
| mipmap-xxhdpi  | xx-high density screen    | 144x144            | ic_launcher.png    |
| mipmap-xxxhdpi | xxx-high density screen   | 192x192            | ic_launcher.png    |

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

NOTE：

安卓的话，还要修改默认包名（`applicationId`），如果不修改，如果系统监测到当前应用的 `applicationId` 和已安装的某个应用相同而签名不同，会报错：“签名不一致 该应用可能已被恶意篡改”。

在这个文件中修改包名： `yourApp/android/app/build.gradle`：

```java
// ...

defaultConfig {
    applicationId "com.yourAppId"
    // ...
}

// ...
```

## 3.3 设置启动页

这里使用了第三方插件[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen/)，官网教程已经很详细，这里做简要介绍。

* 项目中安装依赖

1）下载依赖

```bash
yarn add react-native-splash-screen
```

2）添加到项目中

```
react-native link react-native-splash-screen
```

3）在 React Native 配置

这里指的是设置启动页什么时候消失，下面的代码是首页加载完 5s 后启动页消失。

```js
/**
 * ScreenHome/index.js
 * 设置启动页消失时间
 */
import SplashScreen from "react-native-splash-screen"; // 引入 react-native-splash-screen

export default class ScreenHome extends Component {
  // ...
  componentDidMount() {
    // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }
  // ...
}
```

* iOS 设置

1）更新 `AppDelegate.m`：

```c
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SplashScreen.h"  // 导入启动页插件

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // ...其他代码
    [self.window makeKeyAndVisible];
    [SplashScreen show];  // 显示启动页
    return YES;
}

@end
```

2）准备启动页图片

**文件必须是 png 格式的图片**，命名需对应尺寸，可参考下面的命名：

> 如需自动生成可使用这个网页：[appicon](https://www.appicon.build/)

| 尺寸        | 名称                          | 用途                | 是否必须                         |
| ----------- | ----------------------------- | ------------------- | -------------------------------- |
| 640 x 960   | Default@2x.png                | iPhone 4            | 非必须，推荐设置                 |
| 640 x 1136  | Default-568h@2x.png           | iPhone 5            | 非必须，推荐设置                 |
| 750 x 1334  | Default-667h@2x.png           | iPhone 6, 竖屏      | 必须（必须有至少一个启动页图片） |
| 1242 x 2208 | Default-736h@3x.png           | iPhone 6 Plus, 竖屏 | 非必须，推荐设置                 |
| 2208 x 1242 | Default-Landscape-736h@3x.png | iPhone 6 Plus, 横屏 | 非必须，推荐设置                 |
| 1125 × 2436 | Default-812h@3x.png           | iPhone X, 竖屏      | 非必须，推荐设置                 |
| 2436 x 1125 | Default-Landscape-812h@3x.png | iPhone X, 横屏      | 非必须，推荐设置                 |

NOTE:

* 很多教程给出的启动页尺寸比上面的要多，有可能是 Xcode 版本不同导致，Xcode 9.2，iOS 7+ 只需要上面七个尺寸；
* 名称并非一定要按照上面的要求，直接使用 `Default尺寸x尺寸.png` 也可以；

3）在 Xcode 中设置启动页

首先新建 `LaunchImage` 文件，操作步骤如下：

![设置启动页](http://ol9ge41ud.bkt.clouddn.com/launch_image1.png)

然后在 `general` 设置中将启动页指向刚才新建的 `LaunchImage` 文件，**注意 Launch Screen File 必须为空，不然就指向 LaunchScreen.xib 中默认的启动页了**:

![设置启动页](http://ol9ge41ud.bkt.clouddn.com/launch_image2.png)

* 安卓配置

1）更新 `MainActivity.java`：

```java
import android.os.Bundle; // here
import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here
// react-native-splash-screen < 0.3.1
import com.cboy.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
    // ...other code
}
```

2）新建 `launch_screen.xml`

在 `app/src/main/res/layout` 中创建 `launch_screen.xml`（如果没有 `layout` 目录，新建），内容如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/launch_screen">
</LinearLayout>
```

3）准备不同尺寸的启动页图片并放到项目中

安卓是通过文件夹路径寻找启动页面的，所以，多张尺寸的启动页名称相同，都为 `launch_screen.png`，但要放在不同文件夹中，文件夹放置目录为 `yourApp/android/app/src/main/res/`，名称及对应放置的图片尺寸如下：

| 文件夹名称       | 含义                      | 文件夹内部图片尺寸 | 文件夹内部图片名称 |
| ---------------- | ------------------------- | ------------------ | ------------------ |
| drawable-ldpi    | Low Density Screen        | 240x320            | launch_screen.png  |
| drawable-mdpi    | Medium Density Screen     | 320x480            | launch_screen.png  |
| drawable-hdpi    | High Density Screen       | 480x800            | launch_screen.png  |
| drawable-xhdpi   | Extra-high density screen | 720x1280           | launch_screen.png  |
| drawable-xxhdpi  | xx-high density screen    | 960x1600           | launch_screen.png  |
| drawable-xxxhdpi | xxx-high density screen   | 1280x1920          | launch_screen.png  |

> 建议直接从 `480x800` 起步放置 4 张图片就好。

4）优化启动页出现前的短暂白屏

到这里，启动页功能已经 ok，但如果仔细看，可以看到启动页出现前会有短暂白屏，此时可通过更改`android/app/src/main/res/values/styles.xml` 解决：

```xml
<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <!--设置透明背景-->
        <item name="android:windowIsTranslucent">true</item>
    </style>
</resources>
```

> 这种方案时机没有根本解决问题，会发现这样设置以后点击图片不能立即弹出应用，而有短暂的等待时间。

5）**解决安卓 6.0 7.0 安装配置完成后出现闪退**，参考下面设置：

在 `android/app/src/main/res/values` 下面新建 `colors.xml` 文件，内容如下：

```html
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!-- this is referenced by react-native-splash-screen and will throw an error if not defined.  its value does nothing, just here to avoid a runtime error. -->
    <color name="primary_dark">#000000</color>
</resources>
```

因为 react-native-splash-screen 需要一个名为 `primary_dark` 的颜色值作为状态栏的颜色。

## 3.4 最终效果图

设置完桌面图标、修改 APP 展示名称及设置启动页之后的效果图如下：

![图标及启动页](http://ol9ge41ud.bkt.clouddn.com/launch_image.gif)

# 四 打包发布

## 4.1 安卓打包发布

* 生成签名

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

如果使用 mac，执行该命令的目录随意。但一定要保管好自己的 `my-release-key.keystore` 文件，如果忘记签名，不能在原有 App 上面升级，只能重新打包发布。同时，不要将 `keystore` 文件放入版本控制中。

* 设置 gradle 变量

1）首先将签名文件 `my-release-key.keystore` 放在目录 `yourApp/android/app/` 下

2）修改文件 `yourApp/android/gradle.properties` 添加下面代码 (替换 `*****` 为正确的 keystore 密码、别名、和 key 密码)：

```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

3）添加签名信息到 app 的 gradle 配置中

编辑文件 `yourApp/android/app/build.gradle` 加入签名信息

```java
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

* 打包

在终端输入下面命令

```bash
cd android && ./gradlew assembleRelease
```

等待构建完成，便可以在 `yourApp/android/app/build/outputs/apk/release/app-release.apk` 中找到编译后的发布版本。

NOTE：如果遇到这个错误：`Execution failed for task ':app:processReleaseResources'`，做下述修改：

在 `yourApp/android/gradle.properties` 文件最后添加下面代码：

```js
classpath 'com.android.tools.build:gradle:3.0.0'
distributionUrl=https://services.gradle.org/distributions/gradle-4.1-all.zip
android.enableAapt2=false
```

如果还有其他问题，可参考下这篇文章：[安卓打包发布那些坑](https://github.com/xiaogliu/step_by_step/blob/master/other/react/react_native/36.%E5%AE%89%E5%8D%93%E6%89%93%E5%8C%85%E5%8F%91%E5%B8%83%E9%82%A3%E4%BA%9B%E5%9D%91.md)

## 4.2 iOS 打包发布

iOS 打包发布有些麻烦，对于大多数非 iOS 开发者的限制不是 React Native 本身，而是苹果本身的机制，比如，必须要有苹果开发者账号。iOS 打包发布打算另写文章。如果要了解发布流程，可以参考这两篇文章：[iOS 发布 App Store 详细图文教程](http://www.cocoachina.com/appstore/20170627/19622.html)，[React Native iOS 详细打包步骤](https://www.jianshu.com/p/6d1ee919ded3)

> 打包时 `--entry-file` 安卓、iOS 是同一个入口文件 `index.js`

# 五 小结

到目前位置，从改造官方 demo 开始，一个完整的 React Native App 算是完成了，在此基础上可以不断扩展完善。

当然，从生产角度来说，这个 demo 的完成度不高，比如，很多样式还是最原始的状态、比如 WebView（App 中嵌入 H5）、下拉刷新等也没有涉及。其中 WebView、下拉刷新等常用功能会集成到这个 demo 中，但样式并不打算做过多优化，因为从使用角度来讲，样式的完成度越高意味着可定制性越差，并且，那样也会导致代码的可读性变差。希望这个 demo 可以成为完整、普适但不臃肿的脚手架。

不过，同一套代码，安卓和 iOS 上展示的样式会有不同，针对这个，会写文章单独说明。

# 参考资料

[React Native 开发适配心得](http://www.devio.org/2017/10/06/How-to-develop-a-React-Native-application-for-Android-and-iOS-dual-platforms/)
[Apple Developer - App Icon](https://developer.apple.com/ios/human-interface-guidelines/icons-and-images/app-icon/)
[在模拟器安卓 4.0 上运行正常，在手机上安卓 6.0 7.0 都闪退 不知道什么情况求解](https://github.com/crazycodeboy/react-native-splash-screen/issues/149)
[Issues with resources generated by react in Android Studio 3](https://stackoverflow.com/questions/45954209/issues-with-resources-generated-by-react-in-android-studio-3)
