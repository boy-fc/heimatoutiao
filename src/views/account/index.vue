<template>
    <el-card>
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
                <el-button type="text">修改头像</el-button>
            </div>

        </el-form>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
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
    //   获取用户数据信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    // 保存信息
    saveUser () {
      // 校验整个表单
      this.$refs.accountForm.validate((isOk) => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        })
      })
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
}
</style>
