/**
 * 原生 js 语法，DOM 相关
 */
export default {
  // 删除 类名
  deleteClassName(el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  },
  // 将伪数组转化为数组
  transferToArray(obj) {
    return Array.prototype.slice.call(obj);
  },
  // 截流函数
  throttle(method, context, event, time) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function() {
      method.call(context, event);
    }, time);
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
      // 好奇怪，放到类中如果惰性载入失败
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = handler;
    }
  },
  removeHandler(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = null;
    }
  },
  getEvent(event) {
    return event ? event : window.event;
  },

  // 鼠标滚轮事件
  getWheelDelta(event) {
    if (event.wheelDelta) {
      return event.wheelDelta;
    } else {
      return -event.detail * 40;
    }
  },
};
