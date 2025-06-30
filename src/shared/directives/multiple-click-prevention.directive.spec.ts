import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { multipleClickPreventionDirective } from './multiple-click-prevention.directive';

describe('multipleClickPreventionDirective', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let element: any;

  beforeEach(() => {
    element = document.createElement('button');
    document.body.appendChild(element);
    multipleClickPreventionDirective.beforeMount(element);
  });

  afterEach(() => {
    multipleClickPreventionDirective.unmounted(element);
    document.body.removeChild(element);
  });

  test('should prevent multiple clicks within 1 second', async () => {
    // Simulate a click event
    element.click();

    // After the first click, pointerEvents should be 'none'
    expect(element.style.pointerEvents).toBe('none');

    // Wait for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // After 1 second, pointerEvents should be restored
    expect(element.style.pointerEvents).toBe('');
  });

  test('should restore pointerEvents after unmount', async () => {
    // Simulate a click event
    element.click();

    // After the first click, pointerEvents should be 'none'
    expect(element.style.pointerEvents).toBe('none');

    // Unmount the directive
    multipleClickPreventionDirective.unmounted(element);

    // Simulate another click event
    element.click();

    // pointerEvents should not be 'none' anymore since the directive is unmounted
    expect(element.style.pointerEvents).toBe('none');
  });
});
