---
title: 通过 Nginx 反向代理实现跨域请求
date: 2018-05-22 17:57:22
tags: [Nginx]
categories: Server
e_title: nginx-reverse-proxy-achieve-cors
---

# 配置

## 域名映射

域名映射是为了将我们自定义的域名和本地静态资源服务器的 IP 地址绑定，这样我们就可以通过自定义域名去访问静态资源服务器。通过修改 hosts 文件实现域名映射：

```bash
127.0.0.1       localhost
```

## 配置 Nginx

主要是配置多一个 server，在其中设置我们需要监听的地址（跨域请求发出端地址）以及路由转发（静态资源在本地服务器访问、如果请求 api 则访问远程服务器），下面以请求[豆瓣Api V2](https://developers.douban.com/wiki/?title=api_v2)接口做说明：

监听 `localhost` 下面 `9999` 端口下的所有请求，

- 如果请求以 `／` 开头，Nginx 就将请求转发到本地静态资源服务器 `http://127.0.0.1:8081`；
- 如果请求以 `/v2` 开头，Nginx 就将请求转发到 `https://api.douban.com`，这个是我们需要获取额外信息的服务器地址。

> 所以，无论如何要开启本地服务器，可使用 Node 的 [http-server](https://github.com/indexzero/http-server) 模块，或者如果使用 React/Vue 等框架开发，一般都会自动开启一个本地服务器。

```bash
worker_processes 1;

events
{
  worker_connections 1024;
}

http
{
  include mime.types;
  default_type application/octet-stream;
  sendfile on;
  keepalive_timeout 65;

  # 在这个 server 里配置反向代理
  server
  {
    # 本地访问的端口和 server name
    listen 9999;
    server_name localhost;

    location /
    {
      # 本地服务器地址（本地静态资源）
      proxy_pass http://127.0.0.1:8081/;
    }

    location ^~ /v2
    {
      # 远程服务器地址（访问 api 获取信息）
      proxy_pass https://api.douban.com;
      # 把cookie中的path部分从/api替换成/service
      # proxy_cookie_path /api /service;
      # 把cookie的path部分从localhost:8080替换成your.domain.name
      # proxy_cookie_domain localhost:8080 your.domain.name
    }
  }
}
```

cookie 相关的在榄盛项目中没有设置，因为服务器没有指定 domain，所以默认就是发送端服务器的域名，路径是 `/`，而 nginx 作为代理服务器的地址是 `127.0.0.1`，cookie 也就都设置到这里了。如果，服务器设置 cookie 的 domain 和 path 了，要对应调整。比如：

```bash
proxy_cookie_domain server.com nginx_proxy.com
```

```js
<script>
  const xhr = new XMLHttpRequest();

  // 这里的远程服务器地址写 Nginx 监听的地址，Nginx 自动做转发
  xhr.open('GET', 'https://api.douban.com/v2/book/6548683');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log(xhr.status);
    }
  }
  xhr.send();
</script>
```

# 参考资料

[nginx 反向代理之前端转发](https://github.com/superpig/blog/blob/master/201602/01.md)
[反向代理为何叫反向代理？](https://www.zhihu.com/question/24723688)
