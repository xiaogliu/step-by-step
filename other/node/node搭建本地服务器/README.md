有文章建议全局全装 `http-server`，不过这里推荐本地安装，全局安装不好控制。

1. 新建 `package.json` 文件

```
npm init
```

2. 本地安装 `http-server` 模块：

```
npm install http-server --save
```

3. 在 `package.json` 文件中设置启动脚本

```
"scripts": {
  "dev": "http-server -a 127.0.0.1 -p 7070"
},
```

4. 运行

```
npm run dev
```

5. 在当前运行目录下可以放置文件，通过本地服务器访问

> 如果你的当前项目中存在 `public` 文件夹,那么默认静态目录会指定到 `public`
如果没有 `public` 文件夹,那么静态目录就是 根目录 `./`
