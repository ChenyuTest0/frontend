import { shallowMount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, vi } from 'vitest';
import DropDownMenuComponent from '@/shared/components/drop-down-menu.component.vue';

describe('DropDownComponent', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wrapper: any;

  const menus = [
    { name: 'Menu 1', handler: vi.fn() },
    { name: 'Menu 2', handler: vi.fn() }
  ];

  beforeEach(() => {
    wrapper = shallowMount(DropDownMenuComponent, {
      props: {
        buttonImg: 'path/to/image.jpg',
        menus
      }
    });
  });

  test('renders button with image', () => {
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);

    const img = button.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('path/to/image.jpg');
  });

  test('toggles dropdown on button click', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.vm.dropdownOpen).toBe(true);

    await button.trigger('click');
    expect(wrapper.vm.dropdownOpen).toBe(false);
  });

  test('closes dropdown on submenu click', async () => {
    wrapper.vm.dropdownOpen = true;
    await wrapper.vm.$nextTick();

    const submenuOverlay = wrapper.find('.z-1000');
    await submenuOverlay.trigger('click');

    expect(wrapper.vm.dropdownOpen).toBe(false);
  });

  test('renders menu items', () => {
    wrapper.vm.dropdownOpen = true;
    wrapper.vm.$nextTick();

    const menuItems = wrapper.findAll('a');
    expect(menuItems.length).toBe(menus.length);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuItems.forEach((item: any, index: number) => {
      expect(item.text()).toBe(menus[index].name);
    });
  });

  test('calls menu handler on menu item click', async () => {
    wrapper.vm.dropdownOpen = true;
    await wrapper.vm.$nextTick();

    const menuItems = wrapper.findAll('a');
    await menuItems[0].trigger('click');

    expect(menus[0].handler).toHaveBeenCalled();
  });
});
