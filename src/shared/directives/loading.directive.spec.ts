import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { loadingDirective } from './loading.directive';

// Mock component to apply the directive
const TestComponent = {
  template: '<div v-loading="isLoading"></div>',
  data() {
    return {
      isLoading: false
    };
  },
  directives: {
    loading: loadingDirective()
  }
};

describe('loadingDirective', () => {
  test('adds loader when isLoading is true', async () => {
    const wrapper = mount(TestComponent);
    wrapper.setData({ isLoading: true });
    await wrapper.vm.$nextTick();

    const loader = wrapper.find('.v-l-loader');
    expect(loader.exists()).toBe(true);
  });

  test('removes loader when isLoading is false', async () => {
    const wrapper = mount(TestComponent);
    wrapper.setData({ isLoading: true });
    await wrapper.vm.$nextTick();

    wrapper.setData({ isLoading: false });
    await wrapper.vm.$nextTick();

    const loader = wrapper.find('.v-l-loader');
    expect(loader.exists()).toBe(false);
  });

  test('does not add v-l-pos-rel class when element position is not static', async () => {
    const wrapper = mount({
      template: '<div style="position: absolute;" v-loading="isLoading"></div>',
      data() {
        return {
          isLoading: false
        };
      },
      directives: {
        loading: loadingDirective()
      }
    });

    wrapper.setData({ isLoading: true });
    await wrapper.vm.$nextTick();

    const elem = wrapper.element;
    expect(elem.classList.contains('v-l-pos-rel')).toBe(false);
  });
});
