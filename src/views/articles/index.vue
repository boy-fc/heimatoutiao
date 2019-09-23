<template>
    <el-card>
         <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">内容列表</template>
        </bread-crumb>
        <el-row class="titleCard">全部文章</el-row>
        <!-- 表单数据 ----------------------------------------------------------------------------->
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
        <!-- 文章结构列表------------------------------------------------------------------------>
        <!-- 总条数预览 -->
        <div class="total">共找到55078条符合条件的内容</div>
        <!-- 文章列表 -->
        <div class="container">
            <!-- 左侧内容 -->
            <div class="left">
                 <img src="../../assets/img/404.png" alt="">
                 <div class="info">
                     <span>我一直在看着你</span>
                     <el-tag class="tag">已发表</el-tag>
                     <span>2019-09-23 15:30:23</span>
                 </div>
            </div>
            <!-- 右侧内容 -->
            <div class="right">
                <span>
                    <i class="el-icon-edit"></i>
                    修改
                </span>
                <span class="del">
                    <i class="el-icon-delete"></i>
                    删除
                </span>
            </div>
        </div>
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
.total{
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    border-bottom: 1px dotted #999
}
.container{
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid  #f2f3f5;
    .left{
        display: flex;
        img{
            width: 180px;
            height: 100px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            span:nth-child(1){
                font-size: 14px;
            }
            .tag{
                width: 60px
            }
            span:nth-child(3){
                font-size: 13px;
                color: #888
            }
        }
    }
    .right{
        font-size: 14px;
        .del{
            margin-left: 20px;
        }
    }
}
</style>
