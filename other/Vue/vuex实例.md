- 下面是基于nuxt.js例子

```js
// 设置store文件
export const state = function () {
  return {
    info: null,
    isLogin: false,
    isAgent: false
  };
};

export const mutations = {
  set (state, {userInfo, isAgent}) {
    state.info = userInfo;
    state.isLogin = true;
    state.isAgent = isAgent;
  },
  setOff (state) {
    state.info = {};
    state.isLogin = false;
    state.isAgent = false;
  }
};
```

```html
<!-- html模版中使用：获取状态 -->
<span v-show="!$store.state.user.isLogin" @click="toLogin" title="">登录</span>
```

```js
// js中使用使用：设置新状态，通过mutations方法

// 调用setOff方法
this.$store.commit('user/setOff');

// 调用set方法
this.$store.commit('user/set', { userInfo: res.data, isAgent: true });
```
