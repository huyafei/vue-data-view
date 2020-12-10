import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const other = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../views/home.vue")
  }
];
const routes = [...other];

const router = new VueRouter({
  routes
});

export default router;
