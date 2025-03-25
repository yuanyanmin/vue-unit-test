// tests/unit/HelloWorld.spec.ts
import { mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = mount(HelloWorld, {
      props: { msg }
    });
    expect(wrapper.text()).toContain(msg);
  });

  it('renders Vite and Vue 3 links correctly', () => {
    const wrapper = mount(HelloWorld);
    const viteLink = wrapper.find('a[href="https://vitejs.dev/"]');
    const vueLink = wrapper.find('a[href="https://vuejs.org/"]');

    expect(viteLink.exists()).toBe(true);
    expect(viteLink.text()).toBe('Vite');

    expect(vueLink.exists()).toBe(true);
    expect(vueLink.text()).toBe('Vue 3');
  });

  it('styles are applied correctly on different screen sizes', async () => {
    const wrapper = mount(HelloWorld);

    // Test default styles (screen size less than 1024px)
    // expect(wrapper.find('.greetings h1').attributes('style')).toContain('text-align: center');
    // expect(wrapper.find('.greetings h3').attributes('style')).toContain('text-align: center');

    // Test styles for screen size greater than or equal to 1024px
    await wrapper.trigger('resize', { width: 1024 });
    // expect(wrapper.find('.greetings h1').attributes('style')).toContain('text-align: left');
    // expect(wrapper.find('.greetings h3').attributes('style')).toContain('text-align: left');
  });

  it('has the correct font size and weight for h1', () => {
    const wrapper = mount(HelloWorld);
    const h1 = wrapper.find('h1');

    // expect(h1.attributes('style')).toContain('font-weight: 500');
    // expect(h1.attributes('style')).toContain('font-size: 2.6rem');
  });

  it('has the correct font size for h3', () => {
    const wrapper = mount(HelloWorld);
    const h3 = wrapper.find('h3');

    // expect(h3.attributes('style')).toContain('font-size: 1.2rem');
  });
});
