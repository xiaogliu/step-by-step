## 场景

工作中经常会处理 url：传递参数／获取参数，获取某个字段等等，理解 url 标准格式对于操作 url 会起到事半功倍的效果。   

`protocal://[access_credentials@]hostname[:port]/path/[:parameters][file][?query]#fragment`

- protocol 协议，常用的协议是http, https, ftp
- access_credentials@ 访问凭证，属于hostname的一部分？通过 js `window.location.hostname` 是否一起返回？
- hostname 是指存放资源的服务器的域名系统 (DNS) 主机名或 IP 地址。有时，在主机名前也可以包含连接到服务器所需的用户名和密码（格式：username:password@hostname）
- port 端口 http协议默认端口是：80端口，如果不写默认就是:80端口
- path 路径 由零或多个“/”符号隔开的字符串，一般用来表示主机上的一个目录或文件地址（遇到url特殊字符 ?, # 就终止了）
- parameter 参数 如果要向服务器传入参数，在这部分输入，在浏览器地址栏中，变成path的一部分
- file 常见的 index.html
- query 查询字符串，以“?”字符为起点，每个参数以“&”隔开，再以“=”分开参数名称与数据
- fragment 片段 网页中可能会分为不同的片段，如果想访问网页后直接到达指定位置，可以在这部分设置，`#`后面就是了

## 例子

下面是 url 一个例子：

`http://zh.wikipedia.org:80/w/index.php?title=Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2&printable=yes`

其中：

- http，是协议；
- zh.wikipedia.org，是服务器；
- 80，是服务器上的网络端口号；
- /w/index.php，是路径；
- ?title=Special:%E9%9A%8F%E6%9C%BA%E9%A1%B5%E9%9D%A2&printable=yes，是询问。

## js原生方法

下面方法一栏省略了 `window.location.`, 实际使用时自行加上

以这个为例：

`https://web-t.lansheng8.com:8080/login?redirect=investBill%2F1&amount=100000&billUid=1`

方法     | 返回（都是字符串）
---------|----------------------------------------------------------------------------------
href     | https://web-t.lansheng8.com/login?redirect=investBill%2F1&amount=100000&billUid=1
origin   | https://web-t.lansheng8.com:8080
protocol | https:
host     | web-t.lansheng8.com:8080
hostname | web-t.lansheng8.com
port     | 8080
pathname | /login
search   | ?redirect=investBill%2F1&amount=100000&billUid=1
hash     | 空 (#之后其他特殊字符之前的一串)


> 注意极端： `https://m.lansheng8.com/#/investDetail/11?bangPlan=1` 这个 url 的 pathname 是 `/`, search 为 '', 而 hash 为 `#/investDetail/11?bangPlan=1`

## url 各部分之间的关系：

href：能看到的所有url字符；   
host: hostname + port;   
origin: protocol + hostname + port;   

## URL的特殊字符

常用的有如下

符号 | 含义                         | 十六进制
-----|------------------------------|---------
+    | URL 中+号表示空格            | %2B
空格 | URL中的空格可以用+号或者编码 | %20
/    | 分隔目录和子目录             | %2F
?    | 分隔实际的 URL 和参数        | %3F
%    | 指定特殊字符                 | %25
#    | 表示书签                     | %23
&    | URL 中指定的参数间的分隔符   | %26
=    | URL 中指定参数的值           | %3D
