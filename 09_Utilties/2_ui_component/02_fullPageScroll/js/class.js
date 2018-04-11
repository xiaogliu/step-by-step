import Utils from './Utils.js';

class fullPage {
  constructor(el) {
    this.main = document.querySelector(el);
    // total pages numble
    this.pages = document.querySelectorAll('.page');
    this.pagesNum = this.pages.length;

    this.viewHeight = Utils.getViewportDimension().height;

    // 如果不加时间控制，滚动会过度灵敏，一次翻好几屏
    this.startTime = 0; // 翻屏起始时间
    this.endTime = 0;
    this.now = 0;
  }

  scrollMouse(e) {
    e = Utils.getEvent(e);
    let delta = Utils.getWheelDelta(e);
    startTime = new Date().getTime();

    // 最少 0.5s 翻页一次
    if (endTime - startTime < -500) {
      // 向下滑动
      if (delta < 0 && this.main.offsetTop > -(viewHeight * (pagesNum - 1))) {
        now = now - viewHeight;

        // 避免向下滑动超出边界
        if (now < -(viewHeight * (pagesNum - 1))) {
          now = -(viewHeight * (pagesNum - 1));
        }

        turnPage(now);
        changeNav(now);
      }

      // 向上滑动
      if (delta > 0 && this.main.offsetTop < 0) {
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
  }

  turnPage(height) {
    this.main.style.top = height + 'px';
  }

  // 设置截流函数
  handleMouseWheel(e) {
    Utils.throttle(scrollMouse, document, e);
  }

  // 创建导航
  createNav() {
    const nav = document.createElement('div');
    nav.className = 'nav';

    for (let i = 0; i < pagesNum; i++) {
      nav.innerHTML += '<p class="nav-dot"></p>';
    }
    main.appendChild(nav);

    let navDots = document.querySelectorAll('.nav-dot');
    navDots = Array.prototype.slice.call(navDots);

    // 添加初始样式
    navDots[0].classList.add('active');

    // 添加导航点击事件
    navDots.forEach(function(el, i) {
      Utils.addHandler(el, 'click', function() {
        turnPage(-(i * viewHeight));
        navDots.forEach(function(el) {
          Utils.deleteClassName(el, 'active');
        });

        el.classList.add('active');
      });
    });
  }

  _init() {
    // 创建导航
    createNav();

    // 添加滚轮监听
    Utils.addHandler(document, 'mousewheel', handleMouseWheel);
    Utils.addHandler(document, 'DOMMouseScroll', handleMouseWheel);
  }

  // 随页面滚动改变样式
  changeNav(height) {
    navDots.forEach(function(el) {
      Utils.deleteClassName(el, 'active');
    });

    let i = -(height / viewHeight);
    navDots[i].classList.add('active');
  }
}
