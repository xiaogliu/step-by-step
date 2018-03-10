工作中遇到一个问题：有两个文件`conf.js`和`env.js`，属于环境配置文件，由于本地经常改`host`，改完后有时忘记改回来就提交到远程，但被人拉下来host文件可能是错误的，尤其是直接发布到测试服务器时，由于`host`错误导致bug。   

但将这两个文件添加到`.gitignore`中后，改变居然还被tracking，后来查资料知道：   

**`.gitignore`只会ignore那些还未被track的，也即未被提交的文件。**假如想ignore已经add过得文件，执行下面操作：

1.`git update-index --assume-unchanged <path/to/file>` 将文件视为unchanged，这样就不会接着add；
2.`git rm --cached name_of_file`，将文件从repository中删除（如果文件已经push）

实际，想我开头所说的需求，并不是将`conf.js`从仓库中删除，而是不想讲本地变化提交，用1就好。

> 将文件视为unchanged，**也是一种变化**，只是不会add，也就不会做提交操作。但如果切换分支的时候，记得把该文件回复原来状态，就是“不当做unchanged”，命令为`git update-index --no-assume-unchanged <path/to/file>`不然Git会认为有变化未提交而默认不给切换分支，除非使用`stash`命令。

参考：https://stackoverflow.com/questions/4308610/how-to-ignore-certain-files-in-git
