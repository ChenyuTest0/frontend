import animejs from 'animejs';
import { describe, expect, test, vi } from 'vitest';
import { animeDirective } from './anime.directive';

describe('animeDirective', () => {
  // Mock animejs function
  vi.mock('animejs', () => ({
    __esModule: true,
    default: vi.fn()
  }));

  test('calls animejs on mounted', () => {
    const el = document.createElement('div');
    const binding = { value: { duration: 1000 } };

    animeDirective.mounted(el, binding);

    expect(animejs).toHaveBeenCalledWith({ targets: el, duration: 1000 });
  });

  test('calls animejs on unmounted', () => {
    const el = document.createElement('div');
    const binding = { value: { duration: 1000 } };

    animeDirective.unmounted(el, binding);

    expect(animejs).toHaveBeenCalledWith({ targets: el, duration: 1000 });
  });
});
