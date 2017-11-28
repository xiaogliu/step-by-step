1. npm 版本目前（20171127）最高支持4，我安装了5但不支持；

2. `npm start` 时报错：   

```bash
Unable to start server
See https://git.io/v5vcn for more information, either install watchman or run the following snippet:
  sudo sysctl -w kern.maxfiles=5242880
  sudo sysctl -w kern.maxfilesperproc=524288
```
  
就像终端中提示的那样，解决方法有二：1，安装 watchman 2，执行下面两行命令（更改允许内核打开的最大文件数）