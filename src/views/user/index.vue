<template>
  <div class="page">
    <div class="filter">
      <el-form inline>
        <el-form-item label="昵称：">
          <el-input v-model="queryParam.username" />
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="queryParam.email" />
        </el-form-item>
        <el-form-item label="简介：">
          <el-input v-model="queryParam.bio" />
        </el-form-item>
        <el-button type="primary" @click="handleGetUserList">查询</el-button>
      </el-form>
    </div>
    <el-card shadow="hover" class="user">
      <div slot="header">
        <span style="font-weight:bold">用户列表</span>
      </div>
      <div>
        <el-table
          v-loading="userListLoading"
          :data="userList"
          fit
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="username"
            label="昵称"
            min-width="160"
            align="center"
          />
          <el-table-column
            prop="email"
            label="邮箱"
            min-width="200"
            align="center"
          />
          <el-table-column
            prop="bio"
            label="个人简介"
            align="center"
            min-width="200"
          />
          <el-table-column
            prop="image"
            label="头像"
            align="center"
            min-width="100"
          >
            <template v-slot="scope">
              <img :src="scope.row.image" alt="" style="height:50px;width:50px;">
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="200"
          >
            <template v-slot="scope">
              <el-button type="primary" size="mini" @click="editDialogData=scope.row;editDialogVisible=true">编辑</el-button>
              <el-button type="warning" size="mini" @click="handleReset(scope.row)">重置</el-button>
              <el-button type="danger" size="mini" @click="handleDelUser(scope.row.id)">删除</el-button>
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
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="editDialogData" label-position="left" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="editDialogData.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editDialogData.email" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="editDialogData.bio" />
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="editDialogData.image" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, del, update, reset } from '@/api/user'
export default {
  data() {
    return {
      userListLoading: false,
      total: null,
      queryParam: {
        size: 10,
        page: 1,
        username: null,
        email: null,
        bio: null
      },
      userList: [],
      editDialogVisible: false,
      editDialogData: {
        id: null,
        username: null,
        email: null,
        bio: null
      }
    }
  },
  created() {
    this.handleGetUserList()
  },
  methods: {
    handlePageChange(page) {
      this.queryParam.page = page
      this.handleGetUserList()
    },
    async handleGetUserList() {
      this.userListLoading = true
      await list(this.queryParam).then(res => {
        const { data } = res
        this.total = data.total
        this.userList = data.rows
      })
      this.userListLoading = false
    },
    handleDelUser(id) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return del({ id: id })
      }).then(res => {
        if (res) {
          this.$message.success('删除成功！')
          this.handleGetUserList()
        }
      })
    },
    handleConfirmEdit() {
      update(this.editDialogData).then(res => {
        if (res) {
          this.$message.success('更新成功！')
          this.handleGetUserList()
        }
      })
    },
    handleReset(row) {
      this.$confirm('确定将该用户密码重置为123456吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return reset(row)
      }).then(res => {
        if (res) {
          this.$message.success('重置密码成功！')
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
  .user{
    margin-top: 25px;
  }
}
</style>

