/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { container } from 'tsyringe';
import { LoggerService } from '@core/logger/logger.service';

/**
 * タップイベントをLoggerに記録するdirective
 *
 * @export
 */
export const tapEventDirective = {
  beforeMount(el: any, binding: any) {
    el.tapEvent = () => {
      container.resolve(LoggerService).tapEvent(binding.value);
    };
    el.addEventListener('click', el.tapEvent);
  },
  unmounted(el: any) {
    el.removeEventListener('click', el.tapEvent);
  }
};
