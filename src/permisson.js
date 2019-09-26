// 权限
import router from './router'
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css' // 引入css

// 前置导航守卫
router.beforeEach(function (to, from, next) {
  // 开启进度条
  nprogress.start()
  // 判断拦截的范围
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 后置导航守卫
router.afterEach(function () {
  nprogress.done()
})
// 导出
export default router
