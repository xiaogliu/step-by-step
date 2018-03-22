import EventUtil from "./eventUtil.js";

EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
EventUtil.addHandler(document, "DOMMouseScroll", handleMouseWheel);

var main = document.getElementById("main");

// total pages numble
var pages = document.querySelectorAll(".page");
var pagesNum = pages.length;

var viewHeight = document.body.clientHeight;

// 如果不加时间控制，滚动会过度灵敏，一次翻好几屏
var startTime = 0, // 翻屏起始时间
  endTime = 0,
  now = 0;

// 滚动事件处理函数
function handleMouseWheel(e) {
  e = EventUtil.getEvent(e);
  var delta = EventUtil.getWheelDelta(e);
  startTime = new Date().getTime();

  // 最少 0.5s 翻页一次
  if (endTime - startTime < -800) {
    // 上翻
    if (delta < 0 && main.offsetTop > -(viewHeight * (pagesNum - 1))) {
      now = now - viewHeight;
      turnPage(now);
    }

    // 下翻
    if (delta > 0 && main.offsetTop < 0) {
      now = now + viewHeight;
      turnPage(now);
    }
    endTime = new Date().getTime();
  } else {
    EventUtil.preventDefault(e);
  }
}

function turnPage(height) {
  main.style.top = height + "px";
}
