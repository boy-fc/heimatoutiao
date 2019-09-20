<template>
              <el-row type="flex" justify="space-between" class="layout-header">
                <!-- 头部左侧 -->
                <el-col :span="6" class="left">
                  <i class='el-icon-s-unfold icon'></i>
                  <span>江苏传智播客教育科技股份有限公司</span>
                </el-col>
                <!-- 头部右侧 -->
                <el-col :span="3" class="right">
                  <el-dropdown trigger="click">
                      <!-- 匿名插槽 -->
                    <span class="el-dropdown-link">
                      <img class='head-img' src="../../assets/img/avatar.jpg" alt="">
                        橙风沐雨<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item >个人信息</el-dropdown-item>
                      <el-dropdown-item>git地址</el-dropdown-item>
                      <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
</template>

<script>
export default {

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
          border-radius: 15px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
}
</style>
