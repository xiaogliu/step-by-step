借鉴 axios 的设计理念封装基于 fetch 的网络请求函数。本文首先简要分析 axios 的使用及在项目中的封装，然后描述如何封装 fetch 函数。

通过创建 axios 实例，配置不同参数，比如 url，headers（覆盖自定义 header，preflight 请求）

封装的带有响应拦截器的 axios

```js
import axios from 'axios'
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
  // api cache
  let paramStr = `${JSON.stringify(urlParams)}`
  if (localStorage.getItem(paramStr)) {
    return Promise.resolve(JSON.parse(localStorage.getItem(paramStr)))
  } else {
    // default retry config params
    axios.defaults.retry = 5;
    axios.defaults.retryDelay = 1000;

    axios.defaults.timeout = 10000;
    axios.defaults.headers.common['frontend_public_token'] = '123456asdfghj';

    // 统一错误处理，可以在这里设置样式等
    const handleError = err => {
      if (err.response.status) {
        switch (err.response.status) {
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
            console.log(err.response.data.message)
        }
      }
    }
  
    // 带有自动重试功能的响应拦截器
    axios.interceptors.response.use(
      // 成功后处理
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
      // 错误处理，可以设置为匿名函数
      function axiosRetryInterceptor(err) {
        var config = err.config;
        // If config does not exist or the retry option is not set, reject
        if (!config || !config.retry) {
          handleError(err)
          return Promise.reject(err.response);
        }
        
        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;
        
        // Check if we've maxed out the total number of retries
        if (config.__retryCount >= config.retry) {
            // Reject with the error
            handleError(err)
            // reject with error
            return Promise.reject(err.response);
        }
        
        // Increase the retry count
        config.__retryCount += 1;
        
        // Create new promise to handle exponential backoff
        var backoff = new Promise(function(resolve) {
            setTimeout(function() {
                resolve();
            }, config.retryDelay || 1);
        });
        
        // Return the promise in which recalls axios to retry the request
        return backoff.then(function() {
            return axios(config);
        });
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
}
```
