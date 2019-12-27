<template>
  <div class="page">
    <el-button type="primary" @click="addDialogVisible=true">添加</el-button>
    <el-card shadow="hover" class="tags">
      <div slot="header">
        <span style="font-weight:bold">标签列表</span>
      </div>
      <div>
        <el-table
          v-loading="tagsListLoading"
          :data="tagsList"
          fit
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="ID"
            min-width="100"
            align="center"
          />
          <el-table-column
            prop="name"
            label="名称"
            align="center"
            min-width="160"
            sortable
          />
          <el-table-column
            label="操作"
            align="center"
            min-width="200"
          >
            <template v-slot="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelTags(scope.row.id)">删除</el-button>
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
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="25%">
      <el-form :model="editDialogData" label-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="editDialogData.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="addDialogVisible" width="25%">
      <el-form :model="addDialogData" label-position="left" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="addDialogData.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, del, update, add } from '@/api/tags'
export default {
  data() {
    return {
      tagsListLoading: false,
      total: null,
      queryParam: {
        size: 10,
        page: 1
      },
      tagsList: [],
      editDialogVisible: false,
      editDialogData: {
        id: null,
        name: null
      },
      addDialogVisible: false,
      addDialogData: {
        name: null
      }
    }
  },
  created() {
    this.handleGetTagsList()
  },
  methods: {
    handlePageChange(page) {
      this.queryParam.page = page
      this.handleGetTagsList()
    },
    async handleGetTagsList() {
      this.tagsListLoading = true
      await list(this.queryParam).then(res => {
        const { data } = res
        this.total = data.total
        this.tagsList = data.rows
      })
      this.tagsListLoading = false
    },
    handleDelTags(id) {
      this.$confirm('确定删除该标签吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return del({ id: id })
      }).then(res => {
        if (res) {
          this.$message.success('删除成功！')
          this.handleGetTagsList()
        }
      })
    },
    handleEdit(row) {
      // 不能直接对象赋值
      this.editDialogData.id = row.id
      this.editDialogData.name = row.name
      this.editDialogVisible = true
    },
    handleConfirmEdit() {
      update(this.editDialogData).then(res => {
        if (res) {
          this.$message.success('更新成功！')
          this.editDialogVisible = false
          this.handleGetTagsList()
        }
      })
    },
    handleConfirmAdd() {
      add(this.addDialogData).then(res => {
        if (res) {
          this.$message.success('添加成功！')
          this.addDialogVisible = false
          this.handleGetTagsList()
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
  .tags{
    margin-top: 25px;
  }
}
</style>

