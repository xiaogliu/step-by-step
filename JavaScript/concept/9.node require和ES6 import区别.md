node.js是通过`require`引入模块的，而ES6加入`import`作为引入模块的标准。两者区别？   

因为现在并没有JS引擎真正的支持ES6的模块系统，所以都是需要转换的（2017-08-24）。   

`require`是借用了CommonJS的规范，node.js使用时ES6模块标准还未发布，虽然现在发布了，但由于node.js基于V8引擎，而V8还未支持ES6模块系统，等V8原生支持后，node.js自然会跟进。   

另外，`require`模块引入是同步的，加载时one by one，而`import`是异步的。   

参考资料：[Using Node.js require vs. ES6 import/export](https://stackoverflow.com/questions/31354559/using-node-js-require-vs-es6-import-export)
