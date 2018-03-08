var http = require("http");
var fs = require("fs"); //引入文件读取模块
var url = require("url");

var documentRoot = "/Users/liuxiaoguang/study/test/webpack_static_multi/";
//需要访问的文件的存放目录

var server = http
  .createServer(function(req, res) {
    // var url = req.url;
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html

    // parses the url request for a file and pulls the pathname
    var url_request = url.parse(req.url).pathname;
    var tmp = url_request.lastIndexOf(".");
    var extension = url_request.substring(tmp + 1);

    var file = documentRoot + url_request;
    console.log(url_request);
    //E:/PhpProject/html5/websocket/www/index.html

    fs.readFile(file, function(err, data) {
      /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
      if (err) {
        res.writeHeader(404, {
          "content-type":
            'text/html;text/css;application/javascript;charset="utf-8"'
        });
        res.write("<h1>404错误</h1><p>你要找的页面不存在</p>");
        res.end();
      } else {
        // set content type
        if (extension === "html")
          res.writeHeader(200, {
            "Content-Type": 'text/html;charset="utf-8"'
          });
        else if (extension === "htm")
          res.writeHeader(200, {
            "Content-Type": 'text/html;charset="utf-8"'
          });
        else if (extension === "css")
          res.writeHeader(200, {
            "Content-Type": 'text/css;charset="utf-8"'
          });
        else if (extension === "js")
          res.writeHeader(200, {
            "Content-Type": 'text/javascript;charset="utf-8"'
          });
        else if (extension === "png")
          res.writeHeader(200, { "Content-Type": "image/png" });
        else if (extension === "jpg")
          res.writeHeader(200, { "Content-Type": "image/jpg" });
        else if (extension === "jpeg")
          res.writeHeader(200, { "Content-Type": "image/jpeg" });
        else {
          console.log("NO CORRECT EXTENSION");
        }
        res.write(data); //将index.html显示在客户端
        res.end();
      }
    });
  })
  .listen(9999);

console.log("服务器开启成功，打开 http://localhost:9999/index.html");
