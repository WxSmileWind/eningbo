import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';//引用字体css
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css';
import animated from 'animate.css';
// 引入echarts
import echarts from 'echarts';
//v-viewer 图片放大组件
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css';

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
//将饿了么ui层级设置从1000开始
Vue.use(ElementUI, { zIndex: 1000 });
Vue.use(animated);
Vue.use(Vant);
Vue.use(dataV);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
