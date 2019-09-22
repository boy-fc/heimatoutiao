import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index'
import Login from './views/login/index'
import Main from './views/home/main'
import Comment from './views/comment'
import Material from './views/material'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        // 评论列表
        {
          path: 'comment',
          component: Comment
        },
        // 素材列表
        {
          path: 'material',
          component: Material
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
