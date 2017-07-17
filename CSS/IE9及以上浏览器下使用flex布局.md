Flex是W3C在2009年提出的一种布局方案，可以方便的实现各种布局，但因为浏览器兼容性问题（主要是IE浏览器，即便IE11都不能很好的兼容Flex布局），迟迟得不到广泛的推广。   
但新公司非常激进，html5，CSS3，ES6/7各种新特性都开始使用，为了在使用了Flex布局的情况下兼容IE9+，必须寻找polyfill方案。

在没有使用框架的情况下，引入[jonathantneal/flexibility](https://github.com/jonathantneal/flexibility)，按照文档规范编写CSS。   

也可以引入postcss，自动添加前缀，参考这个仓库：如果是在vue中使用，则引入这个库[7rulnik/postcss-flexibility](https://github.com/7rulnik/postcss-flexibility)
