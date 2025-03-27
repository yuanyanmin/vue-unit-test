import { mount } from '@vue/test-utils';
import TableView from '@/views/TableView.vue';
import { ElButton, ElTable, ElForm, ElInput, ElDialog, ElMessage } from 'element-plus';


describe('TableView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TableView, {
      global: {

      }
    });
  });

  it('renders two rows in the table initially', () => {
    expect(wrapper.findAll('.el-table__row').length).toBe(2);
  });

  it('opens the dialog when the "新增" button is clicked', async () => {
    const addButton = wrapper.find('.el-button.el-button--primary');
    await addButton.trigger('click');
    expect(wrapper.vm.dialogVisible).toBe(true);
    expect(wrapper.vm.dialogTitle).toBe('新增');
  });

  it('opens the dialog for editing when the "编辑" button is clicked', async () => {
    const editButton = wrapper.findAll('.el-button.el-button--small')[0];
    await editButton.trigger('click');
    expect(wrapper.vm.dialogVisible).toBe(true);
    expect(wrapper.vm.dialogTitle).toBe('编辑');
  });

  it('deletes a row when the "删除" button is clicked', async () => {
    const deleteButton = wrapper.findAll('.el-button.el-button--danger')[0];
    await deleteButton.trigger('click');
    expect(wrapper.findAll('.el-table__row').length).toBe(1);
  });

  it('submits the form and adds a new row when the "确认" button is clicked', async () => {
    const addButton = wrapper.find('.el-button.el-button--primary');
    await addButton.trigger('click');

    const formNameInput = wrapper.find('.el-input__inner');
    await formNameInput.setValue('王五');

    const formAgeInput = wrapper.find('.el-input__inner[type="number"]');
    await formAgeInput.setValue(35);

    const formAddressInput = wrapper.findAll('.el-input__inner')[2];
    await formAddressInput.setValue('广州市');

    const submitButton = wrapper.find('.el-button.el-button--primary');
    await submitButton.trigger('click');

    expect(wrapper.findAll('.el-table__row').length).toBe(3);
  });

  it('submits the form and updates an existing row when the "确认" button is clicked in edit mode', async () => {
    const editButton = wrapper.findAll('.el-button.el-button--small')[0];
    await editButton.trigger('click');

    const formNameInput = wrapper.find('.el-input__inner');
    await formNameInput.setValue('张三更新');

    const submitButton = wrapper.find('.el-button.el-button--primary');
    await submitButton.trigger('click');

    const firstRowName = wrapper.find('.el-table__row .cell:nth-child(1)');
    expect(firstRowName.text()).toBe('张三更新');
  });

  it('shows an error message when the form is submitted with invalid data', async () => {
    const addButton = wrapper.find('.el-button.el-button--primary');
    await addButton.trigger('click');

    // clear the name input to make the form invalid
    const formNameInput = wrapper.find('.el-input__inner');
    await formNameInput.setValue('');

    const submitButton = wrapper.find('.el-button.el-button--primary');
    await submitButton.trigger('click');

    expect(ElMessage.error).toHaveBeenCalledWith('表单验证失败!');
  });
});
