/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { rippleEffectDirective } from './ripple-effect.directive';

describe('rippleEffectDirective', () => {
  let wrapper: any;
  let button: any;

  beforeEach(() => {
    wrapper = mount({
      template: '<button v-ripple-effect></button>',
      directives: {
        rippleEffect: rippleEffectDirective
      }
    });
    button = wrapper.find('button');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(
      button.element,
      'removeEventListener'
    );
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      button.element.rippleEffectEvent
    );
  });
});
