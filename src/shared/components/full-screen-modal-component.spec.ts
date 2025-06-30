import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import fullScreenModalComponent from '@/shared/components/full-screen-modal-component.vue';

vi.mock('@vueuse/integrations/useFocusTrap', () => {
  return {
    useFocusTrap: () => ({
      activate: vi.fn(),
      deactivate: vi.fn()
    })
  };
});

vi.mock('../utils/modal.util', () => ({
  ModalUtil: {
    pop: vi.fn()
  }
}));

describe('Component', () => {
  test('renders correctly', () => {
    const wrapper = shallowMount(fullScreenModalComponent);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.findAll('div').length).toBe(5); // 親div + 4つの子div
  });
});
