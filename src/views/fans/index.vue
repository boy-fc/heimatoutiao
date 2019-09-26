<template>
    <el-card>
        <!-- 面包屑组件 -->
        <bread-crumb slot="header">
            <template slot="title">图文数据</template>
        </bread-crumb>
        <!-- 图表数据展示 -->
        <el-row type="flex" justify="space-btween">
            <!-- 工作图表 -->
            <div class="echarts" ref="workChart"></div>
            <div class="echarts" ref="lifeChart"></div>
        </el-row>
    </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      workData: [820, 932, 901, 934, 1290, 1330, 1320],
      lifeData: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  // 钩子函数
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  mounted () { // mounted(文档被挂载后)
    // 图表的初始化
    this.workChart = echarts.init(this.$refs.workChart) // 获取dom元素并进行图表实例化
    this.lifeChart = echarts.init(this.$refs.lifeChart)
    this.setWorkOption()
    this.setLifeOption()
  },
  methods: {
    //   更新数据
    updateData () {
      this.workData = this.workData.map(item => {
        return item * (Math.random() + 0.7)
      })
      this.lifeData = this.workData.map(item => {
        return item * (Math.random() + 0.7)
      })
    },
    // 生活图表
    setLifeOption () {
      this.lifeChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.lifeData
          }
        ]
      })
    },
    //   工作图表
    setWorkOption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周六']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.workData,
          type: 'line'
        }]
      })
    }
  },
  watch: {
    workData (newValue) {
      this.setWorkOption()
      this.setLifeOption()
    }
  }
}
</script>

<style lang='less' scoped>
.echarts{
    width: 600px;
    height: 400px;
}
</style>
