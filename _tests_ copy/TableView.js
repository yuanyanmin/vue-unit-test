import { mount } from '@vue/test-utils'
import TableView from '@/views/TableView.vue'

describe('TableView.vue', () => {
  let wrapper
  const initialData = [
    { name: '张三', age: 25, address: '北京市' },
    { name: '李四', age: 30, address: '上海市' }
  ]

  beforeEach(() => {
    wrapper = mount(TableView)
  })

  // 基础功能测试
  it('正确初始化表格数据', () => {
    expect(wrapper.vm.tableData).toEqual(initialData)
    expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
  })

  describe('新增功能', () => {
    it('打开新增对话框时应重置表单', async () => {
      await wrapper.vm.openDialog('add')
      expect(wrapper.vm.dialogTitle).toBe('新增')
      expect(wrapper.vm.form).toEqual({ name: '', age: null, address: '' })
    })

    it('成功添加合法数据', async () => {
      const validData = {name: '王五', age: 28, address: '广州市' }
      await testFormSubmission('add', validData, initialData.length + 1)
    })
  })

  describe('编辑功能', () => {
    it('打开编辑对话框时应填充数据', async () => {
      await wrapper.vm.openDialog('edit', initialData[0])
      expect(wrapper.vm.dialogTitle).toBe('编辑')
      expect(wrapper.vm.form).toEqual(initialData[0])
    })

    it('成功修改数据', async () => {
      const modifiedData = { ...initialData[0], age: 26 }
      await testFormSubmission('edit', modifiedData, initialData.length)
    })
  })

  describe('删除功能', () => {
    it('正确删除指定行', async () => {
      await wrapper.vm.deleteRow(0)
      expect(wrapper.vm.tableData).toHaveLength(initialData.length - 1)
      expect(wrapper.vm.tableData).not.toContainEqual(initialData[0])
    })
  })

  // 表单验证专项测试
  describe('表单验证', () => {
    let messageErrorSpy

    beforeEach(async () => {
      // 模拟Element组件
      messageErrorSpy = jest.spyOn(wrapper.vm.$message, 'error')
      await wrapper.vm.openDialog('add')
    })

    afterEach(() => {
      jest.clearAllMocks()
    })
  
    const testInvalidSubmission = async (formData) => {
      wrapper.vm.form = { ...formData }
      await wrapper.vm.submitForm()
      
      // 验证错误提示
      expect(messageErrorSpy).toHaveBeenCalledWith('表单验证失败!')
      // 验证数据未变化
      expect(wrapper.vm.tableData).toHaveLength(initialData.length)
    }

    it('应拒绝空表单提交', async () => {
      await testInvalidSubmission({ name: '', age: null, address: '' })
    })
  
    it('应验证年龄格式', async () => {
      await testInvalidSubmission({ name: '测试', age: 'abc', address: '地址' })
    })

    it('应验证必填字段', async () => {
      const testCases = [
        { name: '', age: 20, address: '地址' },
        { name: '测试', age: null, address: '地址' },
        { name: '测试', age: 20, address: '' }
      ];

      for (const testCase of testCases) {
        await testInvalidSubmission(testCase);
      }
    });
  });



  // 公共测试方法
  async function testFormSubmission(action, testData, expectedLength) {
    await wrapper.vm.openDialog(action, testData)
    wrapper.vm.form = { ...testData }
    await wrapper.vm.submitForm()
    
    expect(wrapper.vm.tableData).toHaveLength(expectedLength)
    expect(wrapper.vm.tableData).toEqual(expect.arrayContaining([testData]))
  }

})
