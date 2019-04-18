借鉴 axios 的设计理念封装基于 fetch 的网络请求函数。本文首先简要分析 axios 的使用及在项目中的封装，然后描述如何封装 fetch 函数。

封装的带有响应拦截器的 axios

```js
import axios from 'axios'
// host variable
import { host } from '../env'

/**
 * @param method            HTTP method
 * @param url               URL
 * @param bodyParams        HTTP Body
 * @param urlParams         URL Params
 */
export default function (method, url, {
  bodyParams = {},
  urlParams = {}
}) {
  axios.defaults.timeout = 10000;
  axios.defaults.headers.common['frontend_public_token'] = '123456asdfghj';

  // 响应拦截器
  axios.interceptors.response.use(
    response => {
      if (response.status === 200) {
        // api cache
        localStorage.setItem(paramStr, JSON.stringify(response.data))
        // why can't return response.data ?
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    },
    // 服务器状态码不是 200 的情况
    error => {
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            console.log('401')
            break;
          case 403:
            console.log('登录超时')
            break;
            // 404 请求不存在
          case 404:
            console.log('404 请求不存在')
            break;
          default:
            console.log(error.response.data.message)
        }
        return Promise.reject(error.response);
      }
    }
  );

  return axios({
    method: method,
    url: url,
    baseURL: host,
    params: urlParams,
    data: bodyParams,
    withCredentials: true,
  })
}
```
