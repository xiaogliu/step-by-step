const http = require("http");
const path = require("path");
const config = require("./config/default.json");

// 创建静态类
class StaticServer {
  constructor() {
    this.port = config.port;
    this.root = config.root;
    this.indexPage = config.indexPage;
  }

  start() {
    // 通过 http 模块创建服务器，设置监听端口
    http
      .createServer((req, res) => {
        const pathName = path.join(this.root, path.normalize(req.url));

        // 发送 http 头部
        res.writeHead(200);

        // 发送响应数据
        res.end(`Request path: ${pathName}`);
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
