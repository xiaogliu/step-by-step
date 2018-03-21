class EasyMenu {
  constructor(container) {
    this.container = container;
    this.state = {};
  }

  init(optionParams) {
    this.state = optionParams;
    this.renderDOM();
    this.interaction();
  }

  renderDOM() {
    let state = this.state;
    const container = this.selectorEle(this.container);

    // 创建按钮
    const menuBtn = document.createElement("div");
    menuBtn.classList.add("menu-btn");
    menuBtn.innerHTML = "<div></div><div></div><div></div>";
    container.appendChild(menuBtn);

    // 创建跳转菜单
    const menuContent = document.createElement("div");
    menuContent.classList.add("menu-content");
    let menuContentInnerHTML = "";
    Object.keys(state.link).forEach(function(e) {
      console.log(state.link[e]);
      menuContentInnerHTML += `<a href="${state.link[e]}">${e}</a>`;
    });
    menuContent.innerHTML = menuContentInnerHTML;
    container.appendChild(menuContent);

    // 创建遮罩
    const menuCover = document.createElement("div");
    menuCover.classList.add("menu-cover");
    container.appendChild(menuCover);
  }

  interaction() {
    $(".menu-btn").click(function() {
      $(this).toggleClass("menu-btn-click");
      $(".menu-content").toggleClass("menu-content-show");
      $(".menu-cover").toggleClass("menu-cover-show");
    });
    $(".menu-cover").click(function() {
      $(".menu-btn").toggleClass("menu-btn-click");
      $(".menu-content").toggleClass("menu-content-show");
      $(".menu-cover").toggleClass("menu-cover-show");
    });
  }

  selectorEle(element) {
    return document.querySelector(element);
  }
}
