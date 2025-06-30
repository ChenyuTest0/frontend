import {
  pushModal,
  config,
  popModal,
  closeModal,
  openModal
} from 'jenesius-vue-modal';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { ModalUtil, ModalTransitionType, ModalConfig } from './modal.util';

vi.mock('jenesius-vue-modal', () => ({
  pushModal: vi.fn(),
  config: vi.fn(),
  popModal: vi.fn(),
  closeModal: vi.fn(),
  openModal: vi.fn()
}));

describe('ModalUtil', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initialize should set the initial configuration', () => {
    ModalUtil.initialize();
    expect(config).toHaveBeenCalledWith({
      backgroundClose: true,
      animation: 'modal-transition',
      scrollLock: true,
      escClose: true
    });
  });

  test('push should set config, push modalConfig and call pushModal', async () => {
    const component = {};
    const params = {};
    const modalConfig: ModalConfig = {
      dismissible: false,
      transitionType: ModalTransitionType.SLIDE_UP
    };

    await ModalUtil.push(component, params, modalConfig);

    expect(config).toHaveBeenCalledWith({ backgroundClose: false });
    expect(pushModal).toHaveBeenCalledWith(component, params);
  });

  test('open should set config, reset configs and call openModal', async () => {
    const component = {};
    const params = {};
    const modalConfig: ModalConfig = {
      dismissible: true,
      transitionType: ModalTransitionType.FADE_IN
    };

    await ModalUtil.open(component, params, modalConfig);

    expect(config).toHaveBeenCalledWith({ backgroundClose: true });
    expect(openModal).toHaveBeenCalledWith(component, params);
  });

  test('pop should call popModal and reset config after timeout', async () => {
    vi.useFakeTimers();
    await ModalUtil.pop();

    expect(popModal).toHaveBeenCalled();
    vi.runAllTimers();
    expect(config).toHaveBeenCalled();
  });

  test('closeAll should call closeModal and reset config after timeout', async () => {
    vi.useFakeTimers();
    await ModalUtil.closeAll();

    expect(closeModal).toHaveBeenCalled();
    vi.runAllTimers();
    expect(config).toHaveBeenCalled();
  });

  test('setTransition should set the correct transition style', () => {
    const root = document.documentElement;
    const setPropertySpy = vi.spyOn(root.style, 'setProperty');

    ModalUtil['setTransition'](ModalTransitionType.SLIDE_UP);
    expect(setPropertySpy).toHaveBeenCalledWith(
      '--modal-transition',
      'translateY(100%)'
    );

    ModalUtil['setTransition'](ModalTransitionType.FADE_IN);
    expect(setPropertySpy).toHaveBeenCalledWith(
      '--modal-transition',
      'translateY(-60px)'
    );
  });
});
