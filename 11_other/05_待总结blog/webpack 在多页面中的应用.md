[TypeScript + Serverless + Webpack + Babel](https://itnext.io/typescript-serverless-webpack-babel-15778188c7)

webpack 打包体积还是太大，webpack 5 减小很多，但很多坑，并且实际也很大。


[webpack-dev-server hot reload not working](https://stackoverflow.com/questions/39066298/webpack-dev-server-hot-reload-not-working)
webpack-dev-server 只是一个 local server，不会输出 file，但在内存中是有的，

```js
  output: {
    // 这里设置为相对路径出错了
    publicPath: "/"
  },
```
