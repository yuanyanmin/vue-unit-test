import { mount } from '@vue/test-utils'
// import Test from '@/components/Test.vue'
import Test from './Test.vue'

describe('Test.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(Test)

    // Check if the initial message is correct
    expect(wrapper.find('.msg').text()).toBe('Hello,jest')
    // Check if the button is rendered
    expect(wrapper.find('#btnClick').exists()).toBe(true)
    // Check if the box is visible initially
    expect(wrapper.find('.box').exists()).toBe(true)

    // Wait for nextTick to complete
    await wrapper.vm.$nextTick()

    // Check if the box is hidden after nextTick
    expect(wrapper.find('.box').exists()).toBe(false)
  })

  it('updates message on button click', async () => {
    const wrapper = mount(Test)

    // Check the initial message
    expect(wrapper.find('.msg').text()).toBe('Hello,jest')

    // Trigger the click event
    await wrapper.find('#btnClick').trigger('click')

    // Check the updated message
    expect(wrapper.find('.msg').text()).toBe('Bye')
  })
})
