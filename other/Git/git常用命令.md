1. 查看本地分支和远程分支哪个分支对应

```
git branch -vv
```

2. git 查看全局配置

```
git config -l

# 设置crlf为false
git config --global core.autocrlf false
# 为什么windows下默认为true https://stackoverflow.com/questions/2825428/why-should-i-use-core-autocrlf-true-in-git

# 设置别名
git config --global alias.st status

# 删除别名
git config --global --unset alias.st
```

3. 创建新仓库，并且与远程仓库关联

```
echo "# node.js-demos" >> README.md
git initgit add README.md
git commit -m "first commit"
git remote add origin git@github.com:xiaogliu/repo-name.git
git push -u origin master
```

4. 将已有的仓库推到远程仓库

```
git remote add origin git@github.com:xiaogliu/repo-name.git
git push -u origin master
```

5. add文件后，commit前，可以进行两部操作：1，将某个状态为staged的文件变回unstaged状态，但仍然保留修改（git add 误把所有文件都add了，但并不想将所有文件都作为一次commit）；2，将staged/unstaged文件中修改的部分取消，此时还没有commit；参考：https://git-scm.com/book/zh/v1/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C

```
# staged --> unstaged and remain changes
git reset HEAD <filename>

# discard changes
git checkout -- <filename>
```

6. 本地新建分支推到远程分支

```
git ps -u origin D17082301
```

7. 临时忽略文件

How to ignore changed files (temporarily)
In order to ignore changed files to being listed as modified, you can use the following git command:

```
git update-index --assume-unchanged <file>
```

To revert that ignorance use the following command:（必须有这步，不然无法切换分支，会认为有未提交的更改）

```
git update-index --no-assume-unchanged <file>
```
