/* eslint-disable sonarjs/no-duplicate-string */
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import LoadingComponent from './loading.component.vue';

describe('LoadingComponent', () => {
  test('renders correctly when loading is true', () => {
    const wrapper = shallowMount(LoadingComponent, {
      props: { loading: true, isTransparent: false }
    });

    expect(wrapper.find('.absolute').exists()).toBe(true);
    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });

  test('does not render when loading is false', () => {
    const wrapper = shallowMount(LoadingComponent, {
      props: { loading: false, isTransparent: false }
    });

    expect(wrapper.find('.absolute').exists()).toBe(false);
  });

  test('spinner has transparent border when isTransparent is true', () => {
    const wrapper = shallowMount(LoadingComponent, {
      props: { loading: true, isTransparent: true }
    });

    expect(wrapper.find('.animate-spin').exists()).toBe(false);
  });

  test('spinner does not have transparent border when isTransparent is false', () => {
    const wrapper = shallowMount(LoadingComponent, {
      props: { loading: true, isTransparent: false }
    });

    const spinner = wrapper.find('.animate-spin');
    expect(spinner.exists()).toBe(true);
    expect((spinner.element as HTMLElement).style.borderTopColor).toBe(
      'transparent'
    );
  });
});
