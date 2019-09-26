import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './permisson'
import ElementUI from 'element-ui' // 引入UI
import Component from './components' // 引入插件对象
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
// import axios from 'axios'
import axios from './untils/axios.config'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component) // 注册插件

Vue.prototype.$axios = axios // 将axios共享给所有Vue或者组件实例使用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
