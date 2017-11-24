可以通过HomeBrew直接进行升级：   

```bash
brew install python3
```

> 如果是直接只用brew安装速度可能会很慢，解决方法有两个：第一，使用国内中科大的镜像源；第二，科学上网，但要注意，终端和浏览器代理不同，只设置浏览器或者像多肽这种客户端代理默认设置，终端是无法科学上网的（可以通过命令`curl ip.cn`查看，如果还是国内网络，就是未科学上网），需要单独配置，推荐用[shadowsocks/ShadowsocksX-NG](https://github.com/shadowsocks/ShadowsocksX-NG)

这样安装以后，mac下是同时存在 python2.7 和 python 3.x 的，不能卸掉 python 2.7，据说时macOS要使用。   

安装完python 3.x，自带pip3.x。
