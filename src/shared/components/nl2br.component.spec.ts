/* eslint-disable sonarjs/no-duplicate-string */
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { Nl2br } from './nl2br.component';

describe('Nl2br', () => {
  test('component name', () => {
    expect('Nl2Br').toBe(Nl2br.name);
  });

  test('renders text with line breaks', () => {
    const text = 'Hello\nWorld';
    const wrapper = shallowMount(Nl2br, {
      props: { text }
    });
    expect(wrapper.html()).toContain('<br>');
    expect(wrapper.text()).toBe('HelloWorld');
  });

  test('default tag is p', () => {
    const text = 'Hello\nWorld';
    const wrapper = shallowMount(Nl2br, {
      props: { text }
    });
    expect(wrapper.element.tagName).toBe('P');
  });

  test('custom tag', () => {
    const text = 'Hello\nWorld';
    const wrapper = shallowMount(Nl2br, {
      props: { text, tag: 'div' }
    });
    expect(wrapper.element.tagName).toBe('DIV');
  });

  test('custom class', () => {
    const text = 'Hello\nWorld';
    const wrapper = shallowMount(Nl2br, {
      props: { text, class: 'custom-class' }
    });
    expect(wrapper.classes()).toContain('custom-class');
  });
});
