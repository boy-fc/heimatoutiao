<template>
    <el-card>
         <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">内容列表</template>
        </bread-crumb>
        <el-row class="titleCard">全部文章</el-row>
        <!-- 表单数据 ----------------------------------------------------------------------------->
        <el-form style="margin-left: 50px">
            <!-- 文章状态 -->
            <el-form-item label="文章状态：">
                <el-radio-group>
                    <el-radio>全部</el-radio>
                    <el-radio>草稿</el-radio>
                    <el-radio>待审核</el-radio>
                    <el-radio>审核通过</el-radio>
                    <el-radio>审核失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 频道列表 -->
            <el-form-item label="频道列表：">
                <el-select ></el-select>
            </el-form-item>
            <!-- 时间选择 -->
            <el-form-item label="时间选择：">
                <el-date-picker type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <!-- 文章结构列表------------------------------------------------------------------------>
        <!-- 总条数预览 -->
        <div class="total">共找到55078条符合条件的内容</div>
        <!-- 文章列表 -->
        <div class="container" v-for="item in list" :key="item.id">
            <!-- 左侧内容 -->
            <div class="left">
                 <img :src="item.cover.images.length? item.cover.images[0]: defaultImg" alt="">
                 <div class="info">
                     <span>{{item.title}}</span>
                     <el-tag class="tag" :type="item.status|statusType">{{item.status|statusText}}</el-tag>
                     <span>{{item.pubdate}}</span>
                 </div>
            </div>
            <!-- 右侧内容 -->
            <div class="right">
                <span><i class="el-icon-edit"></i>修改</span>
                <span class="del"><i class="el-icon-delete"></i>删除</span>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/login_bg.jpg'), // 默认图片
      list: [] // 文章列表
    }
  },
  methods: {
    //   获取文章列表----------------------------------------------------------
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  //   钩子函数-----------------------------------------------------------------
  created () {
    this.getArticles()
  },
  //   过滤器
  filters: {
    //   过滤文本内容
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    // 过滤文本框颜色
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang='less' scoped>
.titleCard{
    border-bottom: 1px dotted #ccc;
    height: 30px;
    margin-bottom: 50px;
}
.total{
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    border-bottom: 1px dotted #999
}
.container{
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid  #f2f3f5;
    .left{
        display: flex;
        img{
            width: 180px;
            height: 100px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            span:nth-child(1){
                font-size: 14px;
            }
            .tag{
                width: 60px;
                text-align: center;
            }
            span:nth-child(3){
                font-size: 13px;
                color: #888
            }
        }
    }
    .right{
        font-size: 14px;
        .del{
            margin-left: 20px;
        }
    }
}
</style>
