<template>
  <div class="page">
    <div class="filter">
      <el-form inline>
        <el-form-item label="标题：">
          <el-input v-model="queryParam.title" />
        </el-form-item>
        <el-form-item label="作者：">
          <el-input v-model="queryParam.author" />
        </el-form-item>
        <el-form-item label="标签：">
          <el-input v-model="queryParam.tags" />
        </el-form-item>
        <el-button type="primary" @click="handleGetArticleList">查询</el-button>
      </el-form>
    </div>
    <el-card shadow="hover" class="article">
      <div slot="header">
        <span style="font-weight:bold">文章列表</span>
      </div>
      <div>
        <el-table
          v-loading="articleListLoading"
          :data="articleList"
          fit
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            label="标题"
            min-width="200"
            align="center"
          />
          <el-table-column
            prop="author.username"
            label="作者"
            min-width="130"
            align="center"
          />
          <el-table-column
            prop="description"
            label="文章描述"
            align="center"
            min-width="200"
          />
          <el-table-column
            label="文章标签"
            align="center"
            min-width="200"
          >
            <template v-slot="scope">
              <span v-for="(tag,i) in scope.row.tagList" :key="tag.id">
                {{ tag.name }}
                <span v-if="i !== scope.row.tagList.length-1">/</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="创建时间"
            align="center"
            min-width="160"
          />
          <el-table-column
            prop="createdAt"
            label="更新时间"
            align="center"
            min-width="160"
          />
          <el-table-column
            label="操作"
            align="center"
            min-width="100"
          >
            <template v-slot="scope">
              <el-button type="danger" size="mini" @click="handleDelArticle(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="display: flex;justify-content: center;margin-top: 10px;"
          :hide-on-single-page="true"
          :page-size="queryParam.size"
          :current-page="queryParam.page"
          :total="total"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { list, del } from '@/api/article'
export default {
  data() {
    return {
      articleListLoading: false,
      total: null,
      queryParam: {
        size: 10,
        page: 1,
        tags: null,
        author: null,
        title: null
      },
      articleList: []
    }
  },
  created() {
    this.handleGetArticleList()
  },
  methods: {
    handlePageChange(page) {
      this.queryParam.page = page
      this.handleGetArticleList()
    },
    async handleGetArticleList() {
      this.articleListLoading = true
      await list(this.queryParam).then(res => {
        const { data } = res
        this.total = data.total
        this.articleList = data.rows
      })
      this.articleListLoading = false
    },
    handleDelArticle(id) {
      del({ id: id }).then(res => {
        if (res) {
          this.$message.success('删除成功！')
          this.handleGetArticleList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  margin: 20px 40px;
  .filter{
    background-color: #fff;
    width: 100%;
    padding: 20px 30px 0px 30px;
    border-radius: 5px;
  }
  .article{
    margin-top: 25px;
  }
}
</style>

