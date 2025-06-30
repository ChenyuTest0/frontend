import { container } from 'tsyringe';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { tapEventDirective } from './tap-event.directive';
import { LoggerService } from '@/core/logger/logger.service';

describe('tapEventDirective', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockLoggerService: any;

  beforeEach(() => {
    mockLoggerService = {
      tapEvent: vi.fn(),
      loggers: [],
      trace: vi.fn(),
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
      systemError: vi.fn(),
      createLogWithStackTrace: vi.fn(),
      event: vi.fn(),
      addLogger: vi.fn()
    };
    container.registerInstance(LoggerService, mockLoggerService);
  });

  test('should call tapEvent on click', async () => {
    const binding = { value: 'testEvent' };
    const element = document.createElement('div');

    // Simulate the directive's beforeMount hook
    tapEventDirective.beforeMount(element, binding);

    // Simulate a click event
    element.click();

    // Assert that the tapEvent method was called with the correct argument
    expect(mockLoggerService.tapEvent).toHaveBeenCalledWith('testEvent');
  });

  test('should remove event listener on unmounted', async () => {
    const binding = { value: 'testEvent' };
    const element = document.createElement('div');

    // Simulate the directive's beforeMount hook
    tapEventDirective.beforeMount(element, binding);

    // Simulate the directive's unmounted hook
    tapEventDirective.unmounted(element);

    // Spy on the tapEvent method to ensure it is not called after unmounted
    const tapEventSpy = vi.spyOn(mockLoggerService, 'tapEvent');

    // Simulate a click event
    element.click();

    // Assert that the tapEvent method was not called after unmounted
    expect(tapEventSpy).not.toHaveBeenCalled();
  });
});
