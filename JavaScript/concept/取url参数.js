/**
* 取url参数
* @param: name 属性名
*/
getUrlPar (name) {
  let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)');
  let r = window.location.href.substr(1).match(reg);
  if (r !== null) {
    return r[2];
  }
  return '';
}
