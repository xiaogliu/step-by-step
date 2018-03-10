const http = require('http'); // http是node自带模块，无需安装

const serv = http.createServer(function (req, res) {
  res.writeHead(200, {
    // 在respnse headers中注明是编码、数据类型
    "Content-Type": "text/html;charset=utf-8",

    // 允许跨域请求，端口后面不能有/
    'Access-Control-Allow-Origin': 'http://127.0.0.1:7070',
  });
  res.end('这是你要的数据：data');
});

serv.listen(3030, '127.0.0.1');

console.log('服务启动，监听 127.0.0.1:3030');
