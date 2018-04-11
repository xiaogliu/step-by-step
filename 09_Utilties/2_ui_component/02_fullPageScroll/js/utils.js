/**
 * 原生 js 语法，DOM 相关
 */

export default {
  // 获取元素距 document 顶部距离
  getElementTop(elt) {
    let actualTop = elt.offsetTop;
    let currentElt = elt.offsetParent;

    while (currentElt !== null) {
      actualTop += currentElt.offsetTop;
      currentElt = currentElt.offsetParent;
    }

    return actualTop;
  },

  // 获取元素样式
  getElementStyle(elt, attr) {
    let style = window.getComputedStyle(elt, null);

    return style[attr];
  },

  // 删除 类名
  deleteClassName(el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  },

  // 将伪数组转化为数组
  transferToArray(obj) {
    let arr = Array.prototype.slice.call(obj);
    return arr;
  },

  // 截流函数
  throttle(method, context, event) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
      method.call(context, event);
    }, 30);
  },

  // 判断是否是手机浏览器
  isMobile() {
    if (
      navigator.userAgent.match(
        /Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone/i,
      )
    ) {
      return true;
    }
    return false;
  },
  // 获取 viewport 尺寸
  getViewportDimension() {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
      };
    }
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  },

  /**
   * 兼容事件 begin
   */
  addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  getEvent(event) {
    return event ? event : window.event;
  },
  getTarget(event) {
    return event.target || event.srcElement;
  },
  preventDefault(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  // 鼠标滚轮事件
  getWheelDelta(event) {
    if (event.wheelDelta) {
      return event.wheelDelta;
    } else {
      return -event.detail * 40;
    }
  },

  /**
   * 兼容事件 end
   */
};
