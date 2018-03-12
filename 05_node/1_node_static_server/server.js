const http = require("http");
const path = require("path");
const fs = require("fs");
const config = require("./config/default.json");

// 创建静态类
class StaticServer {
  constructor() {
    this.port = config.port;
    this.root = config.root;
    this.indexPage = config.indexPage;
  }

  respondNotFound(req, res) {
    res.writeHead(404, {
      "Content-Type": "text/html"
    });
    res.end(
      `<h1>Not Found</h1><p>The requested URL ${
        req.url
      } was not found on this server.</p>`
    );
  }

  respondFile(pathName, req, res) {
    const readStream = fs.createReadStream(pathName);
    readStream.pipe(res);
  }

  routeHandler(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
      if (!err) {
        this.respondFile(pathName, req, res);
      } else {
        this.respondNotFound(req, res);
      }
    });
  }

  start() {
    // 通过 http 模块创建服务器，设置监听端口
    http
      .createServer((req, res) => {
        const pathName = path.join(this.root, path.normalize(req.url));

        // 处理路由
        this.routeHandler(pathName, req, res);
      })
      .listen(this.port, err => {
        if (err) {
          console.error(err);
          console.info("Failed to start server");
        } else {
          console.info(
            `Server started on port ${
              this.port
            }，you can open http://localhost:${this.port}`
          );
        }
      });
  }
}

module.exports = StaticServer;
