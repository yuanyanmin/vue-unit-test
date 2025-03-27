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


export default {
  data() {
    return {
      tableData: [
        { name: '张三', age: 25, address: '北京市' },
        { name: '李四', age: 30, address: '上海市' }
      ],
      dialogVisible: false,
      dialogType: 'add',
      dialogTitle: '新增',
      form: { name: '', age: null, address: '' },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字' }
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    openDialog(type, row) {
      this.dialogType = type
      this.dialogTitle = type === 'add' ? '新增' : '编辑'
      this.form = type === 'add' ? { name: '', age: null, address: '' } : { ...row }
      this.form = row || { name: '', age: null, address: '' }
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
        this.tableData.push({ ...this.form })
      } else {
        const index = this.tableData.findIndex(item => item.name === this.form.name)
        this.tableData.splice(index, 1, { ...this.form })
      }
      this.dialogVisible = false
    },
    deleteRow(index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>
