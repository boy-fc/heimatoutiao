<template>
    <el-card>
        <!-- 面包屑组件 -->
        <bread-crumb slot='header'>
            <template slot='title'>账户信息</template>
        </bread-crumb>
         <!-- 主体 -->
        <el-form style='margin-left:60px' label-width="100px">
            <el-form-item label="用户名：">
                <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="简介：">
                <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
                <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input style="width:300px" disabled></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存信息</el-button>
            </el-form-item>
            <!-- 头像 -->
            <div class="header">
                 <img src="../../assets/img/fc.jpg" alt="" >
                 <el-button type="text">修改头像</el-button>
            </div>

        </el-form>
    </el-card>
</template>

<script>
export default {

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
