<template>
  <el-card style="pos" v-loading='loading'>
    <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">素材管理</template>
        </bread-crumb>
        <!-- http-request 自定义上传 -->
        <el-upload :show-file-list="false" :http-request="uploadImg" action="" class='pos'>
          <el-button type='primary'>上传素材</el-button>
       </el-upload>
    <!-- 标签 ------------------------------------------------------------------>
    <el-tabs v-model="activeName" @tab-click="getMaterial">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <!-- 图片 -->
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" >
          <!-- 小标签 -->
            <div class='operate'>
              <i @click="collectPic(item)" :style='{color: item.is_collected ? "red" : "#000"}' class='el-icon-star-on'></i>
              <i @click="deletePic(item.id)" class='el-icon-delete-solid'></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <!-- ------------------------------------------------------------------- -->
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <!-- 图片 -->
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="" >
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页---------------------------------------------------------------------- -->
    <el-pagination background layout="prev, pager, next" class="tag" @current-change='changeCurrent'
     :total="page.total" :current-page='page.page_current' :page-size='page.pagesizes'>
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [],
      page: {
        total: 0,
        page_current: 1,
        pagesizes: 12
      },
      loading: false
    }
  },
  methods: {
    // 收藏图片------------------------------------------------
    async collectPic (item) {
      let mess = item.is_collected ? '取消' : ''
      await this.$confirm(`您确定要${mess}收藏该图片？`)
      this.loading = true
      await this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      })
      this.getMaterial()
      this.loading = false
    },
    // 删除图片--------------------------------------------
    async deletePic (id) {
      await this.$confirm('您确定要删除该图片吗？')
      // 如果点击确定，调用删除接口
      this.loading = true
      await this.$axios({
        url: `/user/images/${id}`,
        method: 'delete'
      })
      this.getMaterial()
      this.loading = false
    },
    // 上传图片-------------------------------------------------
    async uploadImg (params) {
      const data = new FormData() // 声明一个新的表单
      data.append('image', params.file)
      await this.$axios({
        url: '/user/images',
        method: 'post',
        data: data
      })
      this.getMaterial()
    },
    // 分页按钮
    changeCurrent (newpage) {
      this.page.page_current = newpage
      this.getMaterial()
    },
    //   获取素材列表
    async getMaterial () {
      // this.activeName === 'collect' 相当于去找收藏的数据
      // 如果不等于collect 相等于去找全部的数据
      let result = await this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.page_current, per_page: this.page.pagesizes }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.pos {
  position: absolute;
  right:20px;
  margin-top:-10px;
  z-index: 1
}
.img-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-item{
    width: 180px;
    height: 180px;
    border-radius: 6px;
    margin:30px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
    }
    .operate {
      background-color: #f4f5f6;
      position: absolute;
      left:0;
      bottom:0;
      width: 100%;
      height:30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size:18px;
      }
}
  }
}
.tag{
  text-align: center;
  margin: 20px 0;
}
</style>
