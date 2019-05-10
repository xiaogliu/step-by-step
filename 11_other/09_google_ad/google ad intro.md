同一素材不能出现在同一页面？

1. google ad slot rendered get what div id is render.
[How to get the div id of the slot rendered? ](https://productforums.google.com/forum/#!msg/dfp/GfGELAzSISA/kxYUT3rUAwAJ)

```js
googletag.pubads().addEventListener('slotRenderEnded', function(event) {
	var id = event.slot.getSlotElementId();
	console.log( "a slot has been rendered into the div "+id );
});
```
2. 事件整理

3. 异步加载参数

如果是异步加载 Google 的入参，需要注意 html 中 google 的 js 代码要动态插入，即需要在广告请求发出去之后，再插入，不然，广告无法渲染。

```js
// native ajax request, just be compatible with chrome
var newAjax = function (method, url, fnSucc, fnFail) {
  xhr = new XMLHttpRequest()
  // 连接服务器
  xhr.open(method, url);
  // 发送请求,send里面如果是空参数时要不要穿null？
  xhr.send();
  // 接收响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        // 这就是经常用的.then(data)或者.then(response)，参数其实就是返回的参数
        // 这里把返回的参数作为请求成功的回调函数的参数
        fnSucc(xhr.responseText);
      } else {
        // 或者与后台沟通定义的错误信息
        fnFail('请求失败' + xhr.status);
      }
    }
  }
}
var sendGoogleAd = function() {
  var adKeyArr = Object.keys(adKeyValue)
  adKeyArr.forEach((key, index) => {
    adParamsDict[index] = {}
    adParamsDict[index].key = adKeyArr[index]
    adParamsDict[index].value = adKeyValue[adKeyArr[index]]
  })
  
  googletag.cmd.push(function() {
    googletag.defineSlot('/21623654641/Tinklabs/CW-01', [[100,35],[70,35],[35,35]], 'div-gpt-ad-1540870387934-0').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    // dynamic set google ad params
    adParamsDict.forEach(item => {
        googletag.pubads().setTargeting(item.key, [item.value])
    })
    googletag.enableServices();
  });
}
// dynamic add google script in html
var addGoogleADScript = function() {
  var id = 'div-gpt-ad-1540870387934-0'
  var container = document.querySelector('#div-gpt-ad-1540870387934-0')
  var script = document.createElement('script')
  script.innerHTML = 'googletag.cmd.push(function () {' +
      'googletag.display("div-gpt-ad-1540870387934-0");' +
    '});'
    // container.
  container.appendChild(script)
}
// init function
;(function() {
  // get key-value from backend
  newAjax('GET', CMSHost + '/apis/key_value?_barcode=' + barcode,
  // success
  function(data) {
    adKeyValue = JSON.parse(data).key_value
    if (!adKeyValue.campaign_id) {
      adKeyValue.campaign_id = '0'
    }
    // send google ad
    sendGoogleAd()
    // add google ad script
    addGoogleADScript()
  },
  // fail
  function (e) {
    console.log(e)
  })
})()
```
