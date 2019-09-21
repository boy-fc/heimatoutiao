<template>
    <el-card>
        <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">评论列表</template>
        </bread-crumb>
        <!-- 表格列表 -->
        <el-table :data="tableData">
            <el-table-column label="标题" prop="title" width="600px"></el-table-column>
            <el-table-column align="center" label="评论状态" prop="comment_status" :formatter='stateFormatter'></el-table-column>
            <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
            <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
            <el-table-column align="center" label="操作">
                <!-- 作用域插槽 -->
                <!-- element-会自己管理注册作用域插槽 -->
                <template slot-scope="obj">
                    <el-button type="text" size="small">修改</el-button>
                    <el-button type="text" size="small" @click="closeOrOpen(obj.row)">
                    {{
                         obj.row.comment_status ? "关闭评论" : '打开评论'
                    }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    //   评论打开或者关闭事件
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论吗？`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id }, // 路径参数
          header: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
      })
    },
    //   格式化数据
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },

    //   获取数据列表
    getComment () {
      this.$axios({
        url: '/articles',
        // params 是路径参数也就是 query参数
        params: { response_type: 'comment' }
      }).then(result => {
        this.tableData = result.data.results
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
