<template>
    <!-- 先定义一个大容器 -->
    <el-container>
        <!-- 先防止一个左侧 -->
        <el-aside style="width:200px" class="title">
          <layout-asile></layout-asile>
        </el-aside>
        <!-- 右侧大容器 -->
        <el-container style="background-color: #eee">
            <!-- 头部 -->
            <el-header style="padding:0 0">
            <layout-header></layout-header>
            </el-header>
            <!-- 中间区域 -->
            <el-main style="padding:0 0">
                <!-- 二级路由容器 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

export default {
}
</script>

<style>
.title{
    background-color: #323745
}
</style>
