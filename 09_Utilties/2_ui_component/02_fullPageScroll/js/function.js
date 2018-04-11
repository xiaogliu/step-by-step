import Utils from './Utils.js';

const turnPage = function(height) {
  const main = document.querySelector('#main');
  main.style.top = height + 'px';
};

// 创建右侧导航
// 创建导航DOM
const createNav = function() {
  const main = document.querySelector('#main');

  const nav = document.createElement('div');
  nav.className = 'nav';

  // total pages numble
  const pages = document.querySelectorAll('.page');
  const pagesNum = pages.length;

  const viewHeight = Utils.getViewportDimension().height;

  for (let i = 0; i < pagesNum; i++) {
    nav.innerHTML += '<p class="nav-dot"></p>';
  }
  main.appendChild(nav);

  let navDots = document.querySelectorAll('.nav-dot');
  navDots = Array.prototype.slice.call(navDots);

  // 添加初始样式
  navDots[0].classList.add('active');

  // 添加点击事件
  navDots.forEach(function(el, i) {
    Utils.addHandler(el, 'click', function() {
      turnPage(-(i * viewHeight));
      navDots.forEach(function(el) {
        Utils.deleteClassName(el, 'active');
      });

      el.classList.add('active');
    });
  });
};

// 随页面滚动改变样式
const changeNav = function(height) {
  let navDots = document.querySelectorAll('.nav-dot');
  navDots = Array.prototype.slice.call(navDots);
  const viewHeight = Utils.getViewportDimension().height;

  navDots.forEach(function(el) {
    Utils.deleteClassName(el, 'active');
  });

  let i = -(height / viewHeight);
  navDots[i].classList.add('active');
};

// 如果不加时间控制，滚动会过度灵敏，一次翻好几屏
let startTime = 0, // 翻屏起始时间
  endTime = 0,
  now = 0;

// 滚动事件处理函数
const scrollMouse = function(e) {
  const main = document.querySelector('#main');

  // total pages numble
  const pages = document.querySelectorAll('.page');
  const pagesNum = pages.length;

  const viewHeight = Utils.getViewportDimension().height;

  e = Utils.getEvent(e);
  let delta = Utils.getWheelDelta(e);
  startTime = new Date().getTime();

  // 最少 0.5s 翻页一次
  if (endTime - startTime < -300) {
    // 向下滑动
    if (delta < 0 && main.offsetTop > -(viewHeight * (pagesNum - 1))) {
      now = now - viewHeight;

      // 避免向下滑动超出边界
      if (now < -(viewHeight * (pagesNum - 1))) {
        now = -(viewHeight * (pagesNum - 1));
      }

      turnPage(now);
      changeNav(now);
    }

    // 向上滑动
    if (delta > 0 && main.offsetTop < 0) {
      now = now + viewHeight;

      // 避免向上滑动超出边界
      if (now > 0) {
        now = 0;
      }

      turnPage(now);
      changeNav(now);
    }
    endTime = new Date().getTime();
  } else {
    Utils.preventDefault(e);
  }
};

// 设置截流函数
const handleMouseWheel = function(e) {
  Utils.throttle(scrollMouse, document, e);
};

const _init = function() {
  createNav();

  // 添加滚轮监听
  Utils.addHandler(document, 'mousewheel', handleMouseWheel);
  Utils.addHandler(document, 'DOMMouseScroll', handleMouseWheel);
};

_init();
