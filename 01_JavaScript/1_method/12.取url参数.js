/**
 * 取url参数
 * @param: name 属性名
 */
function getUrlPar(name) {
  let reg = new RegExp("(^|&?)" + name + "=([^&]*)(&|$)");
  let r = window.location.href.substr(1).match(reg);
  if (r !== null) {
    return decodeURIComponent(r[2]);
  }
  return "";
}

// url参数格式：?key1=value1&key2=value2

// 上面例子不好，基本没得维护了，下面更好

// 返回参数对象
function getUrlParams() {
  // 注意去掉前面的问号
  const qs =
    window.location.search.length > 0 ? window.location.search.slice(1) : "";
  // 注意做非空校验，代码更健壮
  const qsArr = qs.length ? qs.split("&") : [];

  const params = {};
  let key;
  let value;
  qsArr.forEach(e => {
    // 解构赋值
    [key, value] = e.split("=");
    if (key) {
      // 要对 url 解码，只要和 decodeURI 区别
      params[key] = decodeURIComponent(value);
    }
  });

  return params;
}

// 直接查询
function getQuery1(name) {
  const qs = location.search.length ? location.search.slice(1) : "";
  const qsArr = qs.length ? qs.split("&") : [];
  // 不能用 forEach 没法中断
  for (let i = 0; i < qsArr.length; i++) {
    console.log(name, qsArr[i].split("=")[0]);
    if (name === qsArr[i].split("=")[0]) {
      return decodeURIComponent(qsArr[i].split("=")[1]);
    }
  }

  return "";
}
