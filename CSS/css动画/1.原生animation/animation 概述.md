凭借 `@keyframes` 规则和 `animation` 属性，便能实现炫酷动画效果。   

## 使用方法

1. 通过 `@keyframes` 自定义**动画名称**及**动画内容**，其中动画内容包括 **动画时长百分比（或者 from/to 关键词，对应 0%/100%）** 和 **css样式**，具体语法如下

```css
/* changeOpacity 是动画名称 */
@keyframes changeOpacity {
  /* 细分的百分比及样式，语法上讲至少一个，实际 1 个没有意义，一般两个起，即开始和结束的样式 */
  0% {
    /* init css style */
    opacity: 1;
  }

  100% {
    /* end css style */
    opacity: 0;
  }
}
```

一般从 0% 开始，到 100% 结束，在上面的例子中最开始时 opacity 为 0，结束时 opacity 为 1。

2. 在需要设置动画的元素上设置 `animation` 属性值

`animation` 本身是符合属性，包含以下具体属性：   

| 属性名称                       | 含义                                                                       |
| ------------------------------ | ------------------------------------------------------------------         |
| animation                      | 所有动画属性的简写属性，除了 animation-play-state 属性                     |
| animation-name                 | 规定 @keyframes 动画的名称                                                 |
| animation-duration             | 规定动画完成一个周期所花费的秒或毫秒。默认是 0                             |
| animation-timing-function      | 规定动画的速度曲线。默认是 "ease"，两头慢中间快（和 "ease-in-out" 区别？） |
| animation-delay                | 规定动画延迟多久开始。默认是 0                                             |
| animation-iteration-count      | 规定动画被播放的次数。默认是 1                                             |
| animation-direction（不常用）  | 规定动画是否在下一周期逆向地播放。默认是 "normal"                          |
| animation-play-state（不常用） | 规定动画是否正在运行或暂停。默认是 "running"                               |
| animation-fill-mode            | 规定对象动画时间之外的状态，默认值为 none，即没有动画时的默认样式          |

最常用也是最基础的使用组合为：

```css
#someElement {
  animation: animation-name animation-duration;
}
```

**`animation-name` 即 `@keyframes` 中定义的 "animationName"；`animation-duration` 即 `@keyframes` 中定义的 `0% ～ 100%` 所用时间。其中过度的速度曲线由 `animation-timing-function` 的值决定**

如，接上面 `@keyframes` 例子：   

```css
/* 动画 changeOpacity 从 0% 到 100% 需要 2s 时间，速度曲线默认为 ease */
#someElement {
  animation: changeOpacity 2s;
}
```

另一个常用属性是 `animation-fill-mode`，如果希望动画结束后保持最后一帧的状态，将其值设为 `forwards`。

接上面的例子：

```css
/* 动画 changeOpacity 结束后 #someElement 的 opacity 的值还是 0（因为 100% 时 opacity 值为 0）而非变成默认的 1（没有设置动画时的值） */
#someElement {
  animation: changeOpacity 2s forwards;
}
```   

### 相关问题

1. `@keyframes` 和 `animation` 有什么直观的联系？

答： `@keyframes` 预定义动画各个时段的状态（此时还是静态的，仅仅通过极限的形式定义了所有状态）， `animation` 通过设置不同值规定动画各个状态什么时间展示、展示多长时间、以怎样的效果展示以及展示完成以后对宿主元素作用怎样的样式（`@keyframes`中的第一帧，要么最后一帧）。

2. 动画结束后，宿主元素样式是怎样的

答：默认恢复到没动画开始前的样式（即没有动画时的样式），但可以通过 `animation-fill-mode` 进行更改。   

3. 有没有更详细的例子？

答：参考同级文件夹 demo 下面 `snow.html`。

### 扩展阅读

[CSS3: Animations vs. Transitions](https://www.kirupa.com/html5/css3_animations_vs_transitions.htm)