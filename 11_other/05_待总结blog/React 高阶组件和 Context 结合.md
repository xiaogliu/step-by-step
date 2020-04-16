React 高阶组件和 Context 结合

这篇文章写的很好

## react 高阶组件

1. 高阶组件是一个函数，返回一个新的组件。
2. 在高阶组件中处理通用逻辑。
3. 对 props 要理解好。

```js
const withOverallPageState = Component => {
  const newComponent = props => (<Component {...props} {...commonPropsInHOC} />);

  component.displayName = displayName(Component);

  return newComponent;
};
```

注意，这里的 `props` 虽然本质上是在传进来的 `Component` 中定义的 props，但，表现上是在调用 `newComponent` 是传入的。这里我当时理解有误区。

其实，是对 react 组件是函数理解不到位：调用结果 HOC 封装的组件，既可以使用 HOC 内部传入的参数，也可以使用调用封装后的组件时直接传入的参数（为了能访问这部分参数，所以在 HOC 内部要使用  `...props` 这个语法），对于组件本身来说，是透明的，它不需要知道谁传入的，只要使用就好。

