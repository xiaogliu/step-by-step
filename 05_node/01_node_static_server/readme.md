node 本地服务器，支持缓存、自定义启动端口。

## 使用

1.  将本仓库复制到本地，并安装依赖

```bash
yarn add
```

2.  更改网页文件根目录

在 `config/default.json` 中修改存放网页文件的根目录

```json
{
  "root": "your/web/file/absolute/dirctory"
}
```

注意，默认读取 `index.html` 文件，请确保这个文件的存在，不然需要在 `config/default.json` 修改配置文件或者设置启动参数。

> 最简单的就是将 `test_file` 的绝对目录替换成自己本机的绝对目录就好了，让后将自己的文件放进去。

3.  启动服务

```bash
node app
```

## 启动参数介绍

为了方便实用，启动是可以通过设置参数覆盖默认配置

* 自定义启动端口号

默认端口号是 `9999`，在启动的时候也可以自定义

```bash
node app -p portNumber
```

* 自定义默认启动文件

默认读取网页目录下的 `index.html`，通过添加 `-i` 自定义启动文件，比如

```bash
node app -i main.html
```

* 缓存相关

设置缓存相关参数，如果测试缓存时可以快速设置，具体可查看 `config/default.json` 默认配置和 `server.js` 配置文件。
