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
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(animated);
Vue.use(Vant);
Vue.use(dataV);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
