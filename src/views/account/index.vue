<template>
    <el-card v-loading='loading'>
        <!-- 面包屑组件 -->
        <bread-crumb slot='header'>
            <template slot='title'>账户信息</template>
        </bread-crumb>
         <!-- 主体 -->
        <el-form style='margin-left:60px' label-width="100px" :model="formData" :rules="rules" ref="accountForm">
            <el-form-item label="用户名：" prop='name'>
                <el-input style="width:300px" v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="简介：">
                <el-input style="width:300px" v-model="formData.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop='email'>
                <el-input style="width:300px" v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input style="width:300px" disabled v-model="formData.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveUser">保存信息</el-button>
            </el-form-item>
            <!-- 头像 -->
            <div class="header">
                <img :src="formData.photo ? formData.photo : defaultImg" alt="" >
                <el-button type="text" @click="dialogVisible = true">修改头像</el-button>
                <!-- 弹层 -->
                <el-dialog title="请点击上传头像" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                     <!--上传  http-request-->
                    <el-upload action="" :show-file-list="false" :http-request="uploadImg">
                        <img class='head-img' :src="formData.photo ? formData.photo : defaultImg " alt="">
                    </el-upload>
                </el-dialog>
            </div>

        </el-form>
    </el-card>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  data () {
    return {
      loading: false,
      // 弹层
      dialogVisible: false,
      formData: {},
      defaultImg: require('../../assets/img/fc.jpg'),
      //   表单校验
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 7, message: '用户名在在 1 到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }
        ]
      }
    }
  },
  methods: {
    // 修改用户头像
    async uploadImg (params) {
      this.dialogVisible = false
      this.loading = true
      let data = new FormData()
      data.append('photo', params.file) // 取出文件放到参数中
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      })
      eventBus.$emit('updateUserInfo')// 抛出一个事件
      this.formData.photo = result.data.photo // 成功上传的头像更新给当前的页面数据
      this.loading = false
    },
    //   获取用户数据信息
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
    },
    // 保存信息
    async saveUser () {
      // 校验整个表单
      await this.$refs.accountForm.validate()
      await this.$axios({
        url: '/user/profile',
        method: 'patch',
        data: this.formData
      })
      // 提示别的组件更新数据
      eventBus.$emit('updateUserInfo')// 抛出一个事件
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    // 弹层关闭
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {})
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.header{
    position: absolute;
    margin-left: 550px;
    top:150px;
    width: 100px;
    height: 100px;
    text-align: center;
    img{
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    .head-img{
    width: 300px;
    height: 300px;
    }
}
</style>
