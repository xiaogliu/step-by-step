code > preference > settings, find `search.followSymlinks` and set its value to `false`, just like this:   

```json
"search.followSymlinks": false
```

这个据说是使用 cnpm/pnpm 安装的文件前面带有 `_` 导致 vscode 打开时搜索产生的问题，具体查看这个讨论：[update vscode 1.17.0 CPU usage at 100% rg.exe bug?](https://github.com/Microsoft/vscode/issues/35659)，已解决 [Use search.followSymlinks for all searches](https://github.com/Microsoft/vscode/issues/37000)   

> 题外话，刚开始以为是 vscode 的 bug， 还想着切换到 sublime 或者 atom，实际上这种想法不对啊，应该是项 **怎么去 debug**