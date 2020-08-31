import Vue from "vue";
import VueRouter from "vue-router";
import eventdx from "../views/eventdx.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "eventdx",
    component: eventdx
  },
  {
    path: "/street",
    name: "street",
    component: () =>
        import(/* webpackChunkName: "about" */ "../views/street.vue")
  },
  {
    path: '/404',
    component: ()=> import("../components/NotFound.vue")
  }
];

const router = new VueRouter({
  mode:'hash',
  routes
  /*mode: 'history',*/
  /*routes*/
});
/*路由守卫拦截器*/
router.beforeEach((to, from, next) => {
  if (to.matched.length !== 0) {
    next()
  } else {
    next({ path: '/404' })
  }
});
export default router;



