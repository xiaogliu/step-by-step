const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");
const zlib = require("zlib");
const mime = require("./mime");
const config = require("./config/default.json");

const hasTrailingSlash = url => url[url.length - 1] === "/";

// 创建静态类
class StaticServer {
  constructor() {
    this.port = config.port;
    this.root = config.root;
    this.indexPage = config.indexPage;
    this.enableCacheControl = config.cacheControl;
    this.enableExpires = config.expires;
    this.enableETag = config.etag;
    this.enableLastModified = config.lastModified;
    this.maxAge = config.maxAge;
    this.zipMatch = new RegExp(config.zipMatch);
  }

  // 压缩文件
  compressHandler(readStream, req, res) {
    const acceptEncoding = req.headers["accept-encoding"];
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
      return readStream;
    } else if (acceptEncoding.match(/\bgzip\b/)) {
      res.setHeader("Content-Encoding", "gzip");
      return readStream.pipe(zlib.createGzip());
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
      res.setHeader("Content-Encoding", "deflate");
      return readStream.pipe(zlib.createDeflate());
    }
  }

  // 压缩文件
  shouldCompress(pathName) {
    return path.extname(pathName).match(this.zipMatch);
  }

  // 获取有效范围
  getRange(rangeText, totalSize) {
    const matchResults = rangeText.match(/bytes=([0-9]*)-([0-9]*)/);
    let start = parseInt(matchResults[1]);
    let end = parseInt(matchResults[2]);
    if (isNaN(start) && !isNaN(end)) {
      start = totalSize - end;
      end = totalSize - 1;
    } else if (!isNaN(start) && isNaN(end)) {
      end = totalSize - 1;
    }
    return {
      start,
      end
    };
  }

  // 接受范围请求，嘿嘿嘿片里面经常看到，范围有效返回206，不然返回416
  rangeHandler(pathName, rangeText, totalSize, res) {
    const range = this.getRange(rangeText, totalSize);
    if (
      range.start > totalSize ||
      range.end > totalSize ||
      range.start > range.end
    ) {
      res.statusCode = 416;
      res.setHeader("Content-Range", `bytes */${totalSize}`);
      res.end();
      return null;
    } else {
      res.statusCode = 206;
      res.setHeader(
        "Content-Range",
        `bytes ${range.start}-${range.end}/${totalSize}`
      );
      return fs.createReadStream(pathName, {
        start: range.start,
        end: range.end
      });
    }
  }

  // 产生 ETag
  generateETag(stat) {
    const mtime = stat.mtime.getTime().toString(16);
    const size = stat.size.toString(16);
    return `W/"${size}-${mtime}"`;
  }

  // 缓存首部
  setFreshHeaders(stat, res) {
    const lastModified = stat.mtime.toUTCString();
    if (this.enableExpires) {
      const expireTime = new Date(
        Date.now() + this.maxAge * 1000
      ).toUTCString();
      res.setHeader("Expires", expireTime);
    }
    if (this.enableCacheControl) {
      res.setHeader("Cache-Control", `public, max-age=${this.maxAge}`);
    }
    if (this.enableLastModified) {
      res.setHeader("Last-Modified", lastModified);
    }
    if (this.enableETag) {
      res.setHeader("ETag", this.generateETag(stat));
    }
  }

  // 判断缓存是否新鲜
  isFresh(reqHeaders, resHeaders) {
    const noneMatch = reqHeaders["if-none-match"];
    const lastModified = reqHeaders["if-modified-since"];
    if (!(noneMatch || lastModified)) return false;
    if (noneMatch && noneMatch !== resHeaders["etag"]) return false;
    if (lastModified && lastModified !== resHeaders["last-modified"])
      return false;
    return true;
  }

  // 500
  respondError(err, res) {
    res.writeHead(500);
    return res.end(err);
  }

  // 304
  respondNotModified(res) {
    res.statusCode = 304;
    res.end();
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
  respondFile(stat, pathName, req, res) {
    let readStream;
    res.setHeader("Content-Type", mime.lookup(pathName));
    res.setHeader("Accept-Ranges", "bytes");
    if (req.headers["range"]) {
      readStream = this.rangeHandler(
        pathName,
        req.headers["range"],
        stat.size,
        res
      );
      if (!readStream) return;
    } else {
      readStream = fs.createReadStream(pathName);
    }
    if (this.shouldCompress(pathName)) {
      readStream = this.compressHandler(readStream, req, res);
    }
    readStream.pipe(res);
  }

  // 响应目录
  respondDirectory(pathName, req, res) {
    const indexPagePath = path.join(pathName, this.indexPage);
    if (fs.existsSync(indexPagePath)) {
      this.respond(indexPagePath, req, res);
    } else {
      fs.readdir(pathName, (err, files) => {
        if (err) {
          respondError(err, res);
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

  // 响应入口
  respond(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
      if (err) return respondError(err, res);
      this.setFreshHeaders(stat, res);
      if (this.isFresh(req.headers, res._headers)) {
        this.respondNotModified(res);
      } else {
        this.respondFile(stat, pathName, req, res);
      }
    });
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
          this.respond(pathName, req, res);
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
