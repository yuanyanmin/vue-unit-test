<template>
  <div>
    <el-button type="primary" @click="openDialog('add')">新增</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="地址" />
      <el-table-column label="操作">
        <template #default="{ row, $index }">
          <el-button size="small" @click="openDialog('edit', row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteRow($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogType: 'add',
      dialogTitle: '新增',
      form: { name: '', age: null, address: '' },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字' },
          { validator: this.validateAge, trigger: 'blur' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    validateAge(rule, value, callback) {
      if (value < 1 || value > 120) {
        callback(new Error('年龄范围必须在1到120岁之间'));
      } else {
        callback();
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('/api/tableData')
        if (response.data.code === 200) {
          this.tableData = response.data.data
        } else {
          ElMessage.error('数据获取失败!')
        }
      } catch (error) {
        ElMessage.error('数据获取失败，请稍后再试!')
        console.error(error)
      }
    },
    openDialog(type, row) {
      this.dialogType = type
      this.dialogTitle = type === 'add' ? '新增' : '编辑'

      this.form = type === 'add' ? { name: '', age: null, address: '' } : { ...this.form, ...row }
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.form?.clearValidate()
      })
    },
    async validateForm() {
      try {
        await this.$refs.form.validate()
        return true
      } catch (e) {
        return false
      }
    },
    async submitForm() {
      const isValid = await this.validateForm()
      if (!isValid) {
        ElMessage.error('表单验证失败!')
        return
      }

      if (this.dialogType === 'add') {
        await this.addRow()
      } else {
        await this.updateRow()
      }
      this.dialogVisible = false
    },
    async addRow() {
      try {
        // 假设接口为 /api/addRow
        const response = await axios.post('/api/addRow', this.form)
        if (response.data.code === 200) {
          this.tableData.push({ ...this.form })
          ElMessage.success('新增成功!')
        } else {
          ElMessage.error('新增失败!')
        }
      } catch (error) {
        console.error(error)
        ElMessage.error('操作出错，请稍后再试!')
      }
    },
    async updateRow() {
      try {
        // 假设接口为 /api/updateRow
        const response = await axios.put('/api/updateRow', this.form)
        if (response.data.code === 200) {
          const index = this.tableData.findIndex(item => item.name === this.form.name)
          this.tableData.splice(index, 1, { ...this.form })
          ElMessage.success('更新成功!')
        } else {
          ElMessage.error('更新失败!')
        }
      } catch (error) {
        console.error(error)
        ElMessage.error('操作出错，请稍后再试!')
      }
    },
    async deleteRow(index) {
      if (index >= 0 && index < this.tableData.length) {
        try {
          const row = this.tableData[index]
          // 假设接口为 /api/deleteRow
          const response = await axios.delete(`/api/deleteRow/${row.name}`)
          if (response.data.code === 200) {
            this.tableData.splice(index, 1)
            ElMessage.success('删除成功!')
          } else {
            ElMessage.error('删除失败!')
          }
        } catch (error) {
          console.error(error)
          ElMessage.error('操作出错，请稍后再试!')
        }
      }
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
