import { createRouter, createWebHistory } from 'vue-router'
import FirstPage from "../views/View_FirstPage.vue"
import FG_F from "../views/View_FG_F.vue"
import NG_F from "../views/View_NG_F.vue"
import DT_F from "../views/View_DT_F.vue"
import productionPlan from "../views/View_productionPlan.vue"
import productDetails from "../views/View_productDetails.vue"
import view_Login from '../views/view_Login.vue'
import view_register from '../views/view_register.vue'
import test from '../views/View_test.vue'
import bottleNeck from '../views/View_bottleNeck.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: view_Login
    },
    {
      path: '/home',
      name: 'FirstPage',
      component: FirstPage
    },
    {
      path: '/FG_F/:type',
      name: 'FG_F',
      component: FG_F
    },
    {
      path: '/NG_F/:type',
      name: 'NG_F',
      component: NG_F
    },
    {
      path: '/DT_F/:type',
      name: 'DT_F',
      component: DT_F
    },
    {
      path: '/bottleNeck/:type',
      name: 'bottleNeck',
      component: bottleNeck
    },
    {
      path: '/productionPlan',
      name: 'productionPlan',
      component: productionPlan
    },
    {
      path: '/productDetails',
      name: 'productDetails',
      component: productDetails
    },
    {
      path: '/Login',
      name: 'Login',
      component: view_Login
    },
    {
      path: '/register',
      name: 'register',
      component: view_register
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    // {
    //   path: '/NG_S',
    //   name: 'NG_S',
    //   component: NG_S
    // },
    // {
    //   path: '/DT_F',
    //   name: 'DT_S',
    //   component: DT_S
    // },


    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  ]
})

export default router
