// 实现整体组件的统一注册
import layoutAsile from './home/layout-asile'
import layoutHeader from './home/layout-header'
import breadCrumb from '../components/common/bread-crumb'
export default {
  install: function (Vue) {
    //    调用install方法 传入了Vue对象
    // 可不可以在实例化之前注册组件
    Vue.component('layout-asile', layoutAsile) // 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb)
  }
}
