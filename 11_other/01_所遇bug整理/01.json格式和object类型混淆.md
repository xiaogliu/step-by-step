- bug描述：后台返回数据，数据格式需要为对象类型，然后将返回对象的属性填入 form 再传出去。结果传入 form 表单的数据是空的。   

- debug过程：首先打印返回数据，结果如下：

```json
{"mchnt_cd": "0001000F0040992", "order_id": "5KI0owWz", "order_amt": "11", "order_pay_type": "B2C", "page_notify_url": "https://web-t.lansheng8.com", "back_notify_url": "https://api-t.lansheng8.com/guofu/callback", "order_valid_time": "", "iss_ins_cd": "0801030000", "goods_name": "", "goods_display_url": "", "rem": "", "ver": "1.0.1", "md5": "2010b9ab60ca9c41498d463a0a8d59c0"}
```

乍一看没问题，是对象啊，但当打印对象的某个属性是一致是 `undefined`。   

这就有点奇怪了。   

后来忽然想到，返回的数据**并不是对象类型，而是json**，后台修改数据类型搞定。

- 总结  

实际上在 chrome 里面打印出来 json 是字符串样式，里面的键值对全部可以打印出来，见下面示例：   

```js
{"uid":"379","title":"邦计划-一月 20171121期","limits":"20000000","start_time":"1511226000","end_time":"1511312400"}
```

> console.log() 输出即便字符串也没有引号，但是灰色的。

首先，没有格式化，这个一股脑打印了出来；其次所有的 value 都加了引号，即便是数字，这时候凭经验就应该知道这是 json 而非对象类型了。   

对象在 chrome 里面打印出来默认是折叠的，如下：   

```js
{...}
```
