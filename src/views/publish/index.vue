<template>
  <el-card>
         <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">发表文章</template>
        </bread-crumb>
        <el-row class="titleCard">发表文章</el-row>
        <!-- 表单数据 -->
        <el-form style='margin-left:100px' label-width="100px">
            <!-- 标题 -->
            <el-form-item label="标题">
                <el-input style='width:400px'></el-input>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item label="内容">
                <el-input  type="textarea" :rows="4"  placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 封面 -->
            <el-form-item label="封面">
                <el-radio-group>
                    <el-radio>单选</el-radio>
                    <el-radio>三图</el-radio>
                    <el-radio>无图</el-radio>
                    <el-radio>自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 频道选择 -->
            <el-form-item label="频道">
                <el-select></el-select>
            </el-form-item>
            <!-- 底部 -->
            <el-form-item>
                <el-button type='primary'>发布文章</el-button>
                <el-button>存入草稿</el-button>
            </el-form-item>
    </el-form>
    </el-card>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.titleCard {
  border-bottom: 1px dotted #ccc;
  height: 30px;
  margin-bottom: 50px;
}
</style>
