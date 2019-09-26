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
    // 匹配404页面
    {
      path: '*', // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
      component: () => import('./views/404')
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
        },
        // 图文数据
        {
          path: 'gradata',
          component: () => import('./views/fans')
        },
        {
          // 异步应用
          path: 'async',
          component: () => import('./views/async')
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
