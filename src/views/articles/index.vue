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
        <el-radio-group v-model="formData.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 频道列表 -->
      <el-form-item label="频道列表：">
        <el-select v-model="formData.channel_id" @change="changeCondition">
          <!-- 循环获得频道名字 :value绑定值 :label绑定 分组的组名 -->
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <!-- 时间选择 -->
      <el-form-item label="时间选择：">
        <!-- 使用format指定输入框的格式；使用value-format指定绑定值的格式。 -->
        <el-date-picker
          @change="changeCondition"
          value-format="yyyy-MM-dd"
          v-model="formData.date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 文章结构列表------------------------------------------------------------------------>
    <!-- 总条数预览 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <!-- 文章列表 -->
    <div class="container" v-for="(item,index) in list" :key="index">
      <!-- 左侧内容 -->
      <div class="left">
        <img :src="item.cover.images.length? item.cover.images[0]: defaultImg" alt />
        <div class="info">
          <span>{{item.title}}</span>
          <el-tag class="tag" :type="item.status|statusType">{{item.status|statusText}}</el-tag>
          <span>{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <span @click="goEdit(item.id)" class="edit">
          <i class="el-icon-edit"></i>修改
        </span>
        <span class="del"  @click="delArticles(item.id)">
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <!-- 分页按钮---------------------- -->
    <el-pagination
      background
      layout="prev, pager, next"
      class="pages"
      @current-change="changePage"
      :total="page.total"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表单数据
      formData: {
        status: 5, // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
        channel_id: null, // 频道id
        date: []
      },
      defaultImg: require('../../assets/img/login_bg.jpg'), // 默认图片
      list: [], // 文章列表
      channels: [], // 定义一个频道数组
      // 分页
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 跳转到修改编辑页面
    goEdit (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    //   删除事件------------------------
    async delArticles (id) {
      await this.$confirm('您确定要删除此文章吗')
      // id超过了安全数字限制 被jsonbigint转成了bigNUmber类型 要想变成字符串
      // id.toString()
      await this.$axios({
        url: `/articles/${id.toString()}`,
        method: 'delete'
      })
      this.$message({ message: '删除成功', type: 'success' })
      this.queryArticles() // 带条件的查询
    },
    //   分页改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.queryArticles()
    },
    // 搜索时状态改变事件
    changeCondition () {
      // 因为值改变时 formdata已经是最新的值 所以直接可以用formData的值请求
      // 组装请求参数
      this.page.currentPage = 1
      this.queryArticles()
    },
    // 封装函数
    queryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 状态  如果为5时，就是全部，但是接口要求全部不传内容 null就相当于什么都没传
        channel_id: this.formData.channel_id, // 频道id
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null,
        end_pubdate:
          this.formData.date.length > 1 ? this.formData.date[1] : null, // 结束时间
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      //   调用获取文章的接口
      this.getArticles(params)
    },
    // 获取频道选择器数据------------------------------------------------------
    async getChannels () {
      let result = await this.$axios({
        url: '/channels'
      })
      this.channels = result.data.channels
    },
    //   获取文章列表----------------------------------------------------------
    async getArticles (params) {
      let result = await this.$axios({
        url: '/articles',
        params
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 赋值记录总数
    }
  },
  //   钩子函数-----------------------------------------------------------------
  created () {
    this.getArticles()
    this.getChannels()
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
.titleCard {
  border-bottom: 1px dotted #ccc;
  height: 30px;
  margin-bottom: 50px;
}
.total {
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
  border-bottom: 1px dotted #999;
}
.container {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;
      span:nth-child(1) {
        font-size: 14px;
      }
      .tag {
        width: 60px;
        text-align: center;
      }
      span:nth-child(3) {
        font-size: 13px;
        color: #888;
      }
    }
  }
  .right {
    font-size: 14px;
    .edit{
      cursor: pointer;
    }
    .del {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.pages {
  text-align: center;
  margin-top: 20px;
}
</style>
