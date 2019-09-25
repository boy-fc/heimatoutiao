import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index'
import Login from './views/login/index'
import Main from './views/home/main'

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
          component: () => import('./views/comment')
        },
        // 素材列表
        {
          path: 'material',
          component: () => import('./views/material')
        },
        // 内容列表
        {
          path: 'articles',
          component: () => import('./views/articles')
        },
        // 跳转到编辑页面
        {
          path: 'publish/:articleId',
          component: () => import('./views/publish')
        },
        // 发表文章
        {
          path: 'publish',
          component: () => import('./views/publish')
        },
        // 账号信息
        {
          path: 'account',
          component: () => import('./views/account')
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
