check if any package in package.json is outdated: 

```bash
npm outdated
```

update all packages in package.json which are outdated:   

```bash
npm update
```

or update special package:   

```bash
npm update node-sass
```

这是标准代码，但实际上是每次用 npm 命令直接安装更新会导致 cpu 占用率飙升，并且更新失败。简单粗暴的做法是将整个 node_modules 文件夹删除，然后重新安装， 有些安装包是 `linked`，所以能自动到最新的状态？
