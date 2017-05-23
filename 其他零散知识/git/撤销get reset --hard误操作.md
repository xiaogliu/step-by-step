工作中想回滚到特定commit，查到网上相关命令如下：   

```bazaar
git reset --hard <SHAsum of your commit>
```

结果就踩坑了，上面的命令会把自己提交但没有publish的commit全部删掉，于是又找了撤销`git reset --hard`的命令，如下：   

首先查看自己所有的commit（包括reset后丢失的）：   

```bazaar
git reflog
```

找到丢失的commit，重新使用`git reset --hard`指向自己需要找回的commit   

```bazaar
git reset --hard <sha1 of desired commit>
```

> reflog只能记录一段时间的丢掉的记录（据说30天？）。另外，**使用git命令一定要慎之又慎，不能网上搜索匆匆了事，最好看官网命令解析，不然看stackoverflow，中文帖子慎重！**



参考资料：   
1. [How to revert Git repository to a previous commit?](https://stackoverflow.com/questions/4114095/how-to-revert-git-repository-to-a-previous-commit)   
2. [git revert back to certain commit](https://stackoverflow.com/questions/6794110/git-revert-back-to-certain-commit)   
3. [How can I undo git reset --hard HEAD~1?](https://stackoverflow.com/questions/5473/how-can-i-undo-git-reset-hard-head1)