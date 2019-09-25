<template>
    <!-- 素材和上传图片分栏 -->
   <el-tabs value="allImgs">
     <!-- 全部素材 -->
    <el-tab-pane label="全部素材" name="allImgs">
      <div class="allImages">
        <el-card v-for="item in list" :key="item.id" class="imgCard">
          <img :src="item.url" alt="" @click="clickImg(item)">
        </el-card>
      </div>
      <!-- 分页按钮 -->
      <el-pagination background layout="prev, pager, next" style="text-align:center;margin-top:20px" @current-change='changePage'
        :total="page.total" :current-page='page.currentPage' :page-size='page.pageSizes'>
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
      <!-- 自定义上传 -->
      <el-upload :show-file-list="false" action="" :http-request="uploadImg">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 全部图片素材
      page: {
        total: 0,
        currentPage: 1,
        pageSizes: 12
      } // 分页数据
    }
  },
  methods: {
    // 点击图片
    clickImg (item) {
      // 子传父
      this.$emit('selectOneImg', item.url)// 自定义事件，可以带若干参数
    },
    // 分页按钮，改变当前页数
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    // 获取图片素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentPage, per_page: this.page.pageSizes }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    //   上传用户素材
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        //   得到一个线上地址
        this.$emit('selectOneImg', result.data.url)
      })
    }
  },
  // 钩子函数
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.allImages{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .imgCard{
    padding: 0px;
    margin-bottom: 10px;
    width: 150px;
    height: 150px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
