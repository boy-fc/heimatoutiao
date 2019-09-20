// 权限
import router from './router'

router.beforeEach(function (to, from, next) {
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

// 导出
export default router
