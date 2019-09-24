<template>
  <div class="login">
      <!-- 引入和使用elementui组件，el-card -->
     <el-card class="login-card">
         <!-- 匿名插槽 -->
         <div class="title">
             <img src="../../assets/img/logo_index.png" alt="">
         </div>
         <!-- 表单  el-form -->
         <el-form ref="myform" :model="loginForm" :rules="loginRules" style="margin-top: 15px;padding:0 15px">
             <!-- 输入手机号 -->
             <el-form-item prop="mobile">
                 <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
             </el-form-item>
             <!-- 发送验证码 -->
             <el-form-item prop="code" style="margin-bottom:10px">
                 <el-input v-model="loginForm.code" style="width:64%" placeholder="请输入验证码"></el-input>
                 <el-button style="margin-left:20px">发送验证码</el-button>
             </el-form-item>
             <el-form-item prop="agree">
                 <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
             </el-form-item>
             <!-- 登录按钮 -->
             <el-form-item>
                 <el-button @click="login" style="width:100%" type="primary">登录</el-button>
             </el-form-item>
         </el-form>
     </el-card>
  </div>

</template>

<script>
export default {
  data () {
    // value ? callBack():callBack(new Error('您必须同意该协议'))
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: false // 是否同意协议
      },
      //   登录规则校验对象
      loginRules: {
        //   决定着校验规则 key(字段名)：value(对象数组)
        // required: true,该字段必填，如果不填，就会提示消息
        mobile: [{
          required: true,
          message: '请输入您的手机号'
        }, {
          // 验证手机号是否正确
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号'
        }
        ],
        code: [{
          required: true,
          message: '请输入您的验证码'
        },
        // 校验验证码是否是6位
        {
          pattern: /^\d{6}$/,
          message: '请输入正确的验证码'
        }
        ],
        // 校验协议是否勾选
        agree: [{ validator: function (rule, value, callBack) {
          if (value) {
            // 正确，勾选协议
            callBack()
          } else {
            // 不对，没有勾选协议
            callBack(new Error('您必须同意该协议'))
          }
        } }
        ]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validate是一个方法，方法传入一个函数,2个参数，是否校验成功/未效验成功的字段
      this.$refs.myform.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/home')
          // }).catch(() => {
          //   // 提示消息
          //   this.$message({
          //     type: 'warning',
          //     message: '您的手机号或者验证码错误'
          //   })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 如果在组件样式中写less,就要给一个lang属性 lang=less
// 如果加了scoped属性，style只对当前html起作用
.login {
    background-image: url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 440px;
        height: 310px;
        .title{
          background-color: #fff;
            text-align: center;
            img{
                width: 160px;
            }
        }
    }
}
</style>
