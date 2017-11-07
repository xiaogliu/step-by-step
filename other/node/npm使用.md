工作中经常使用 `npm`，通过记录问题的形式深入学习使用 `npm`。

## 问题1:本地安装包有过期的，npm 提示 `deprecate`，但本地有没有安装提示已弃用的 package。

- 问题描述：   

```
peerDependencies WARNING nuxt@1.0.0-alpha.5 › preload-webpack-plugin@^1.2.2 requires a peer of webpack@^3.2.0 but webpack@2.7.0 was installed
deprecate nuxt@1.0.0-alpha.5 › babel-preset-es2015@^6.24.1 ????  Thanks for using Babel: we recommend using babel-preset-env now: please read babeljs.io/env to update!
deprecate gulp-scp2@0.2.0 › scp2@0.2.2 › glob@4.0.6 › minimatch@^1.0.0 Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
deprecate gulp@3.9.1 › vinyl-fs@0.3.14 › glob-stream@3.1.18 › minimatch@^2.0.1 Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
deprecate gulp@3.9.1 › vinyl-fs@0.3.14 › glob-watcher@0.0.6 › gaze@0.5.2 › globule@0.1.0 › minimatch@~0.2.11 Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
deprecate gulp@3.9.1 › vinyl-fs@0.3.14 › glob-watcher@0.0.6 › gaze@0.5.2 › globule@0.1.0 › glob@3.1.21 › graceful-fs@~1.2.0 graceful-fs v3.0.0 and before will fail on node releases >= v7.0. Please update to graceful-fs@^4.0.0 as soon as possible. Use 'npm ls graceful-fs' to find it in the tree.
Recently updated (since 2017-10-31): 12 packages (detail see file /Users/liuxiaoguang/work/lansheng/project/LS-Web/node_modules/.recently_updates.txt)
```

上面提示 `minimatch` 和 `webpack` 过期，但我产看本地 packages 安装列表却报错：

查看本地安装列表： `npm list --depth 0`   

报错： `npm ERR! extraneous: vue-template-es2015-compiler@1.6.0 /Users/liuxiaoguang/work/lansheng/project/LS-Web/node_modules/vue-template-es2015-compiler`   

经过查找 `npm ERR! extraneous` 这表示这个 package 没有在本地安装，但已经全局安装了。   

所以 **查看全局安装列表**， `npm list -g --depth 1`，并没有看到提示的 package，并且我直接在 finder 中查看本地的 node_modules 文件夹是有相关的 package 的。那么为什么 `npm list --depth 0` 会报错？？


本来想升级完全局安装包就好了，但不行，依旧报原来的错误。   

然后我又想着本地安装指定的版本号的 package，比如以安装 webpack 为例：

```
npm install webpack@^3.2.0 --save
```

但安装完以后，依然悲剧，见下面报错，有关联的？

```
peerDependencies link webpack@2.7.0 in /Users/liuxiaoguang/work/lansheng/project/LS-Web/node_modules/_webpack-dev-middleware@1.12.0@webpack-dev-middleware unmet with /Users/liuxiaoguang/work/lansheng/project/LS-Web/node_modules/webpack(3.8.1)
```

再回头看问题描述，这些过期的包都是某个依赖包安装进来的，实际上确实已经安装在了本地。比如 webpack 是随着 nuxt 安装的，而 minimath 是随着 gulp 安装的。

那该如何解决？即

1. 本地已安装但 package.json 文件中没有列举的 package 通过 `npm ls` 会报错 `npm ERR! extraneous`改如何解决？
2. 如何升级依赖包？

**待填坑**

> 不要用 `npm prune`，它会将本地 node_modules 中出现的，但没有在 package.json 中列出来的 package 删掉！

## 顺便写下常用 `npm` 命令

1. 安装卸载

  - `npm install <package>` 不带任何参数的安装默认 **本地安装** 到 `node_modules` 文件夹下面，如果没有这个文件夹会直接创建。但不会将安装报的信息添加到 `package.json` 文件夹；

  - `npm install <p> --save` 加 `--save` 表示添加到 package.json 文件夹中 `dependencies` 中，如果加 `--save-dev` 或者直接用 `-D` 则将安装包添加到 `devDependencies` 中；

  - `npm install <p> -g` 全局安装package（ **少用全局安装** ）；

  - `npm uninstall <p> [-g]` 卸载安装包。

2. 查看需要更新的安装包及升级  

  - `npm outdated [-g]` 列出过期的安装包；
  - `npm update [package] [-g]` 指定升级特定安装包或者全部升级。

3. 查看已安装 packages 列表

  - `npm list [-g] --depth 0` 参数 `--depth` 推荐始终加上，不然展开的内容太多。   

  > 如果直接写 `npm list [-g]` 会把目录树全部展开，为了查看方便添加 `--depth` 后面的数字代表展开的目录树的深度，如果输入 `0` 目录树中没有我们预期的 `package` 可以依次加大数字。

## 其他

1. Difference between npm update and npm install

- npm install will also update devDependencies. However, npm update will not   
- npm install will always reinstall the package. However, npm update will only update if the latest package is not installed.   

In addition to upgrading package versions, npm update can also install any missing packages. In other words, it can function as npm install but the difference is that it will not install missing dev dependencies.  

## 参考资料  
1. [NPM Features and Options Demystified](http://himanshu.gilani.info/blog/2012/10/17/npm-features-and-options-demystified/)
