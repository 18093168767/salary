let head = document.getElementsByTagName('head');
let meta = document.createElement('meta');
meta.name = 'referrer';
//根据实际情况修改referrer的值，可选值参考上文
meta.content = 'no-referrer';
head[0].appendChild(meta);

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const router = new Router({
  mode: "history",
  base: "/",
  routes: [
      {
          path: "/login",
          name: "login",
          component: () => import("@/pages/login.vue")
      },
      {
            path: "/",
            name: "login",
            component: () => import("@/pages/login.vue")
      },
      {
        path: "/loginAdmin",
        name: "loginAdmin",
        component: () => import("@/pages/loginAdmin.vue")
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/pages/registe.vue")
      },
      {
        path: "/userCenter",
        name: "userCenter",
        component: () => import("@/pages/userCenter.vue")
      },
      {
        path: "/adminCenter",
        name: "adminCenter",
        component: () => import("@/pages/adminCenter.vue")
      },
      {
        path: "/userSalary",
        name: "userSalary",
        component: () => import("@/pages/userSalary.vue")
      }
  ]
})

export default router
