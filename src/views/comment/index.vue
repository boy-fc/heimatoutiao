<template>
    <el-card>
        <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">评论列表</template>
        </bread-crumb>
        <!-- 表格列表 -->
        <el-table :data="tableData">
            <el-table-column label="标题" prop="title" width="600px"></el-table-column>
            <el-table-column label="评论状态" prop="comment_status"></el-table-column>
            <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
            <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </el-card>

</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  }
}
</script>

<style>

</style>
