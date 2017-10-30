Margin collapsing is a feature of a [block formatting context(BFC)](https://www.w3.org/TR/CSS22/box.html#collapsing-margins).   

There is no margin collapsing in a [flex formatting context](https://www.w3.org/TR/css-flexbox-1/#flex-containers).   

即 flex 布局没有“外边距塌陷”：  

A flex container establishes a new flex formatting context for its contents. This is the same as establishing a block formatting context, except that flex layout is used instead of block layout. For example, floats do not intrude into the flex container, and the **flex container’s margins do not collapse with the margins of its contents**.  

没有外边距塌陷是flex布局一个特点。   

`BFC` 外边距塌陷主要表现在三个地方：   

- 兄弟元素；
- 父元素与其第一个和最后一个子元素；
- 空元素。

> 注意点：1，负边距处理有些复杂；2，理解如何避免外边距塌陷，这需要了解 `BFC` 的原理。
