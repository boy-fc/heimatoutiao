<template>
    <el-card>
         <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">内容列表</template>
        </bread-crumb>
        <el-row class="titleCard">全部文章</el-row>
        <!-- 表单数据 -->
        <el-form style="margin-left: 50px">
            <!-- 文章状态 -->
            <el-form-item label="文章状态：">
                <el-radio-group>
                    <el-radio>全部</el-radio>
                    <el-radio>草稿</el-radio>
                    <el-radio>待审核</el-radio>
                    <el-radio>审核通过</el-radio>
                    <el-radio>审核失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 频道列表 -->
            <el-form-item label="频道列表：">
                <el-select ></el-select>
            </el-form-item>
            <!-- 时间选择 -->
            <el-form-item label="时间选择：">
                <el-date-picker type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.titleCard{
    border-bottom: 1px dotted #ccc;
    height: 30px;
    margin-bottom: 50px;
}
</style>
