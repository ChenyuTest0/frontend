import { mount } from '@vue/test-utils';
import { test, expect, vi } from 'vitest';
import AlertDialog from './alert-dialog.component.vue';

vi.mock('@vueuse/integrations/useFocusTrap', () => {
  return {
    useFocusTrap: () => ({
      activate: vi.fn(),
      deactivate: vi.fn()
    })
  };
});

// Nl2Brのモック
const Nl2Br = {
  template: '<div />'
};

test('アラートダイアログラベル確認', () => {
  const wrapper = mount(AlertDialog, {
    props: {
      title: 'Test Title',
      message: 'Test Message',
      applicationError: {
        businessMessage: undefined,
        businessMessageTitle: undefined,
        code: 0,
        errorHandlerAfterCallback: undefined,
        skipWhileStackDialog: false,
        name: '',
        message: ''
      }
    },
    global: {
      stubs: {
        Nl2Br
      }
    }
  });
  expect(wrapper.text()).toContain('Button.OK');
});
