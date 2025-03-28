import { mount } from '@vue/test-utils'
import { ElButton, ElTable, ElDialog, ElForm, ElInput } from 'element-plus'
import TableView from '@/views/TableView.vue'

describe('TableView.vue', () => {
  const wrapper = mount(TableView, {
    global: {

    }
  })

  // 初始数据测试
  test('正确初始化表格数据', () => {
    expect(wrapper.vm.tableData).toEqual([
      { name: '张三', age: 25, address: '北京市' },
      { name: '李四', age: 30, address: '上海市' }
    ])
  })

  // 对话框操作测试
  describe('对话框操作', () => {
    test('打开新增对话框应重置表单', async () => {
      await wrapper.find('.el-button--primary').trigger('click')
      expect(wrapper.vm.dialogVisible).toBe(true)
      expect(wrapper.vm.form).toEqual({
        name: '',
        age: null,
        address: ''
      })
    })

    test('打开编辑对话框应填充数据', async () => {
      const editButton = wrapper.findAll('.el-button')[1]
      await editButton.trigger('click')
      expect(wrapper.vm.dialogVisible).toBe(true)
      expect(wrapper.vm.form).toEqual({
        name: '张三',
        age: 25,
        address: '北京市'
      })
    })
  })

  // 表单验证测试
  describe('表单验证', () => {
    test('空表单应验证失败', async () => {
      wrapper.vm.openDialog('add')
      const isValid = await wrapper.vm.validateForm()
      expect(isValid).toBe(false)
    })

    test('年龄字段应验证数字类型', async () => {
      wrapper.vm.openDialog('add', { name: '测试', age: 'abc', address: '地址' })

      // wrapper.vm.form = { name: '测试', age: 'abc', address: '地址' }
      const isValid = await wrapper.vm.validateForm()
      expect(isValid).toBe(false)
    })

    test('正确应返回', async () => {
      wrapper.vm.openDialog('add', { name: '测试', age: 1, address: '地址' })
      // wrapper.vm.form = { name: '测试', age: '1', address: '地址' }
      const isValid = await wrapper.vm.validateForm()
      expect(isValid).toBe(true)
    })
  })

  // 数据操作测试
  describe('数据操作', () => {
    test('新增数据应增加表格行', async () => {
      const initialLength = wrapper.vm.tableData.length
      wrapper.vm.form = { name: '王五', age: 28, address: '广州市' }
      await wrapper.vm.submitForm()
      expect(wrapper.vm.tableData).toHaveLength(initialLength + 1)
    })

    test('编辑数据应更新对应行', async () => {
      wrapper.vm.openDialog('edit', { name: '张三', age: 25, address: '北京市' })
      wrapper.vm.form.name = '张三修改'
      await wrapper.vm.submitForm()
      expect(wrapper.vm.tableData.some(item => item.name === '张三修改')).toBe(true)
    })

    test('删除数据应减少表格行', async () => {
      const initialLength = wrapper.vm.tableData.length
      await wrapper.vm.deleteRow(0)
      expect(wrapper.vm.tableData).toHaveLength(initialLength - 1)
    })
  })

  // 界面元素测试
  test('正确渲染表格列', () => {
    const headers = wrapper.findAll('.el-table__header th')
    expect(headers.map(h => h.text())).toEqual(['姓名', '年龄', '地址', '操作'])
  })

  test('对话框标题应随操作类型变化', async () => {
    wrapper.vm.openDialog('add')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.el-dialog__title').text()).toBe('新增')

    wrapper.vm.openDialog('edit')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.el-dialog__title').text()).toBe('编辑')
  })

  // 边界条件测试
  describe('删除操作边界条件', () => {
    test('无效索引不应修改数据', () => {
      const initialData = [...wrapper.vm.tableData]
      wrapper.vm.deleteRow(-1)
      wrapper.vm.deleteRow(100)
      expect(wrapper.vm.tableData).toEqual(initialData)
    })

    test('删除最后一条数据后表格应为空', async () => {
      // 清空数据
      wrapper.vm.tableData = []
      // 添加测试数据
      wrapper.vm.tableData.push({ name: '测试数据', age: 18, address: '测试地址' })
      await wrapper.vm.deleteRow(0)
      expect(wrapper.vm.tableData).toHaveLength(0)
    })
  })
})
