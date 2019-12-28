<template>
  <div>
    <!-- ===========开头的三个统计数============== -->
    <el-row :gutter="40">
      <el-col :span="8">
        <div class="item" style="background-color:#2075CF">
          <img src="~@/assets/index/user.png" alt="">
          <div>用户总数</div>
          <div>{{ userCount }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item" style="background-color:#2FC25B">
          <img src="~@/assets/index/article.png" alt="">
          <div>文章总数</div>
          <div>{{ articleCount }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="item" style="background-color:#FF6464">
          <img src="~@/assets/index/tags.png" alt="">
          <div>标签总数</div>
          <div>{{ tagsCount }}</div>
        </div>
      </el-col>
    </el-row>
    <!-- ===========开头的三个统计数 结束============== -->
    <!-- ===========中间的折线图============= -->
    <div class="chart">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span style="font-weight:bold">数据统计</span>
        </div>
        <div class="chart-body">
          <div class="left">
            <ve-line :data="chartData" />
          </div>
          <!-- <div class="right">
            <div style="color:#888;font-size:18px;margin:10px 0;">
              访客登记数
            </div>
            <div style="font-weight:bold;font-size:30px;margin:20px 0;">
              20
            </div>
            <div style="color:#888;font-size:18px;margin:10px 0;">
              邀约访客数
            </div>
            <div style="font-weight:bold;font-size:30px;margin:20px 0;">
              15
            </div>
            <div style="color:#888;font-size:18px;margin:10px 0;">
              正在拜访数
            </div>
            <div style="font-weight:bold;font-size:30px;margin:20px 0;">
              12
            </div>
          </div>-->
        </div>
      </el-card>
    </div>
    <!-- ===========中间的折线图 结束============= -->
  </div>
</template>

<script>
import { count, analyze } from '@/api/admin'
export default {
  data() {
    return {
      // 折线图的数据
      chartData: {
        columns: ['时间', '发布文章'],
        rows: [
          { 时间: '09:00', '发布文章': 5 },
          { 时间: '10:00', '发布文章': 1 },
          { 时间: '11:00', '发布文章': 8 },
          { 时间: '12:00', '发布文章': 10 },
          { 时间: '13:00', '发布文章': 13 },
          { 时间: '14:00', '发布文章': 6 },
          { 时间: '15:00', '发布文章': 8 },
          { 时间: '16:00', '发布文章': 4 },
          { 时间: '17:00', '发布文章': 3 },
          { 时间: '18:00', '发布文章': 0 }
        ]
      },
      articleCount: null,
      userCount: null,
      tagsCount: null
    }
  },
  created() {
    this.handleGetCount()
    this.handleAnalyze()
  },
  methods: {
    handleGetCount() {
      count().then(res => {
        const { data } = res
        this.articleCount = data.articleCount
        this.userCount = data.userCount
        this.tagsCount = data.tagsCount
      })
    },
    handleAnalyze() {
      analyze().then(res => {
        const { data } = res
        this.chartData.columns = data.columns
        this.chartData.rows = data.rows
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin: 20px 20px !important;
  .item {
    height: 100px;
    width: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    img{
      width: 40px;
      height: 40px;
    }
    div{
      font-size: 24px;
      color: #fff;
    }
  }
}
.chart {
  margin: 20px 40px;
  .chart-body {
    display: flex;
    .left {
      flex: 4;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
