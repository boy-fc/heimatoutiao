<template>
  <div class="cover-image">
      <!-- 循环遍历生成图片 -->
      <div @click="openLayer(index)" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item? item:defaultImg" alt="">
      </div>
      <!-- 弹层组件 -->
      <el-dialog @close='displayVisible=false' :visible="displayVisible">
          <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      displayVisible: false, // 是否显示弹层
      selectIndex: -1 // 设置默认选择图片的索引
    }
  },
  methods: {
    // 接受子组件的传值
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.displayVisible = false
    },
    //   打开弹层
    openLayer (index) {
      this.displayVisible = true
      this.selectIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    margin-left: 100px;
    margin-bottom: 30px;
    .cover-item{
        width: 200px;
        height: 200px;
        border: 1px solid #ccc;
        padding: 10px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>
