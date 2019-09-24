// 实现整体组件的统一注册
import layoutAsile from './home/layout-asile'
import layoutHeader from './home/layout-header'
import breadCrumb from '../components/common/bread-crumb'
// 富文本编辑
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-image'
export default {
  install: function (Vue) {
    //    调用install方法 传入了Vue对象
    // 可不可以在实例化之前注册组件
    Vue.component('layout-asile', layoutAsile) // 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader) // 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb)// 注册面包屑组件
    Vue.component('quill-editor', quillEditor)// 注册富文本编辑器
    Vue.component('cover-image', coverImg) // 注册封面组件
  }
}
