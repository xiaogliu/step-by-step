1. npm 版本目前（20171127）最高支持4，我安装了5但不支持；

2. `npm start` 时报错：   

```bash
Unable to start server
See https://git.io/v5vcn for more information, either install watchman or run the following snippet:
  sudo sysctl -w kern.maxfiles=5242880
  sudo sysctl -w kern.maxfilesperproc=524288
```
  
就像终端中提示的那样，解决方法有二：1，安装 watchman 2，执行下面两行命令（更改允许内核打开的最大文件数）

见这个讨论： https://github.com/react-community/create-react-native-app/issues/382   

3. 想要安装 [watchman](https://facebook.github.io/watchman/docs/install.html) ，通过 homebrew 安装，结果报下面的错：   

```bash
==> Installing dependencies for watchman: openssl, pcre
==> Installing watchman dependency: openssl
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: Failure while executing: git config --local --replace-all homebrew.private true
```

参考这个解决方法： https://apple.stackexchange.com/questions/209624/how-to-fix-homebrew-error-invalid-active-developer-path-after-upgrade-to-os-x

这个是在装完 xcode 后出现的问题，查看解决方法，貌似和没有装 xcode 的 Command Line Tools 有关，通过启动 xcode 然后给予 develop 权限，然后再通过 xcode 安装 watchman 解决：      

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.