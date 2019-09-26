<template>
              <el-row type="flex" justify="space-between" class="layout-header">
                <!-- 头部左侧 -->
                <el-col :span="6" class="left">
                  <i class='el-icon-s-unfold icon'></i>
                  <span>江苏传智播客教育科技股份有限公司</span>
                </el-col>
                <!-- 头部右侧 -->
                <el-col :span="4" class="right">
                  <el-dropdown trigger="click" @command="commonClick">
                      <!-- 匿名插槽 -->
                    <span class="el-dropdown-link">
                      <img class='head-img' :src="userInfo.photo?userInfo.photo:defaultImg " alt="">
                        {{userInfo.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command='account'>个人信息</el-dropdown-item>
                      <el-dropdown-item command='git'>git地址</el-dropdown-item>
                      <el-dropdown-item command='exit'>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default
{
  data () {
    return {
      userInfo: {}, // 获取用户信息
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64
    }
  },
  methods: {
    // 接口函数
    getUserInfo () {
      // 从缓冲中取出token令牌
      // let token = window.localStorage.getItem('user-token')
      // 发送接口请求
      this.$axios({
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data
      })
    },
    // 退出登录
    commonClick (key) {
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/boy-fc/heimatoutiao'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  // 钩子函数
  created () {
    this.getUserInfo()
    // 一旦监听到事件就会执行后面的函数
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header{
      background-color: #fff;
      height: 60px;
      .left{
        height: 60px;
        line-height: 60px;
        padding-left: 10px
      }
      .right{
        height: 60px;
        line-height: 60px;
        .head-img{
          width: 35px;
          height: 35px;
          border-radius: 15px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
}
</style>
