<template>
  <el-card>
         <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">发表文章</template>
        </bread-crumb>
        <el-row class="titleCard">发表文章</el-row>
        <!-- 表单数据 -->
        <el-form ref='publishForm' :model="formData" :rules="publishRules" style='margin-left:50px' label-width="100px">
            <!-- 标题 -->
            <el-form-item prop='title' label="标题">
                <el-input v-model="formData.title" style='width:400px'></el-input>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item prop='content' label="内容">
                <quill-editor  v-model="formData.content" style="height :300px"></quill-editor>
            </el-form-item>
            <!-- 封面 -->
            <el-form-item label="封面" prop="cover" style="margin-top:120px">
                <el-radio-group v-model="formData.cover.type" @change='changeType'>
                    <el-radio :label="1">单选</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 封面组件 传递父组件的images到子组件中-->
            <cover-image :images='formData.cover.images' @selectImg='changeImg'></cover-image>
            <!-- 频道选择 -->
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formData.channel_id">
                    <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <!-- 底部 -->
            <el-form-item>
                <el-button type='primary' @click="publish(false)">发布文章</el-button>
                <el-button @click="publish(true)">存入草稿</el-button>
            </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      // 表单数据对象
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道
        cover: {
          type: 0,
          images: []
        } // 封面类型：-1：自动 0：无图 1：一张 3：3张
      },
      // 校验规则------------------
      publishRules: {
        title: [{ required: true, message: '标题不能为空' },
        // 最小输入字符
          { min: 5, max: 30, message: '标题长度控制在5-30个字符之间' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 接受子组件传递的地址
    changeImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 图片类型改变事件
    changeType () {
      // 根据type进行对images长度的变化
      // - type == 0 => images => []
      // - type==1 =>images=> [一个字符串] =》 字符串是封面的图片地址
      // - type==3 => images => [3个字符串] =》 字符串是封面的图片地址
      // - type==-1 => images => [可有可无] =》 归为无
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 根据文章id获取文章内容
    getArticledById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        let { articleId } = this.$route.params
        this.$axios({
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'put' : 'post',
          params: { draft }, // draft为true时是草稿
          data: this.formData
        }).then(() => {
          // 发布成功时
          this.$message({ message: articleId ? '修改成功' : '发表成功', type: 'success' })
          this.$router.push('/home/articles')
        })
      })
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels // 获取channels频道
      })
    }
  },
  created () {
    // 获取文章频道
    this.getChannels()
    // 根据文章id获取文章内容
    let { articleId } = this.$route.params
    this.getArticledById(articleId)
  }
}
</script>

<style lang='less' scoped>
.titleCard {
  border-bottom: 1px dotted #ccc;
  height: 30px;
  margin-bottom: 50px;
}
</style>
