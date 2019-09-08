// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vuex from 'vuex'
import store from './store/mating'
import Mui from "vue-awesome-mui"
Vue.use(Vuex)

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
/* eslint-disable no-new */
Vue.prototype.closeback = function (){
  mui.init({
    keyEventBind: {
      backbutton: true //关闭back按键监听
    }
  });
  // //首页返回键处理
  // //处理逻辑：1秒内，连续两次按返回键，则退出应用；
  var first = null;
  mui.back = function() {
    //首次按键，提示‘再按一次退出应用’
    if (!first) {
      first = new Date().getTime(); //记录第一次按下回退键的时间
      mui.toast("再按一次退出应用"); //给出提示
      setTimeout(function() {
        first = null;
      }, 1000);
    } else {
      if (new Date().getTime() - first < 1000) {
        //如果两次按下的时间小于1s，
        plus.runtime.quit(); //那么就退出app
      }
    }
  };
}
Vue.prototype.myback = function (){
  mui.init({
    keyEventBind: {
      backbutton: true //关闭back按键监听
    }
  });
  mui.back = function() {
     history.go(-1); //回退到上一页面
  };
}
const vue=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
export default vue;

//export default vue;
