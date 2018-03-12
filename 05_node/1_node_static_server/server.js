const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");
const mime = require("./mime");
const config = require("./config/default.json");

const hasTrailingSlash = url => url[url.length - 1] === "/";

// 创建静态类
class StaticServer {
  constructor() {
    this.port = config.port;
    this.root = config.root;
    this.indexPage = config.indexPage;
  }

  // 404
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

  // 响应文件
  respondFile(pathName, req, res) {
    const readStream = fs.createReadStream(pathName);

    // 设置mime
    res.setHeader("Content-Type", mime.lookup(pathName));
    readStream.pipe(res);
  }

  // 相应目录
  respondDirectory(pathName, req, res) {
    const indexPagePath = path.join(pathName, this.indexPage);
    if (fs.existsSync(indexPagePath)) {
      this.respondFile(indexPagePath, req, res);
    } else {
      fs.readdir(pathName, (err, files) => {
        if (err) {
          res.writeHead(500);
          return res.end(err);
        }
        const requestPath = url.parse(req.url).pathname;
        let content = `<h1>Index of ${requestPath}</h1>`;
        files.forEach(file => {
          let itemLink = path.join(requestPath, file);
          const stat = fs.statSync(path.join(pathName, file));
          if (stat && stat.isDirectory()) {
            itemLink = path.join(itemLink, "/");
          }
          content += `<p><a href='${itemLink}'>${file}</a></p>`;
        });
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.end(content);
      });
    }
  }

  // 重定向
  respondRedirect(req, res) {
    const location = req.url + "/";
    res.writeHead(301, {
      Location: location,
      "Content-Type": "text/html"
    });
    res.end(`Redirecting to <a href='${location}'>${location}</a>`);
  }

  // 路由处理
  routeHandler(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
      if (!err) {
        const requestedPath = url.parse(req.url).pathname;
        if (hasTrailingSlash(requestedPath) && stat.isDirectory()) {
          this.respondDirectory(pathName, req, res);
        } else if (stat.isDirectory()) {
          this.respondRedirect(req, res);
        } else {
          this.respondFile(pathName, req, res);
        }
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
