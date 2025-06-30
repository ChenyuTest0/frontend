import { describe, expect, test, vi } from 'vitest';
import { NotificationCenterUtil } from './notification-center.util';

describe('NotificationCenterUtil', () => {
  test('should register a listener with on method', () => {
    const listener = vi.fn();
    const disposable = NotificationCenterUtil.on(listener);

    expect(disposable).toBeDefined();
    expect(typeof disposable.dispose).toBe('function');
  });

  test('should register a listener with once method', () => {
    const listener = vi.fn();
    NotificationCenterUtil.once(listener);

    NotificationCenterUtil.emit('Login');
    NotificationCenterUtil.emit('Login');

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('should remove a listener with off method', () => {
    const listener = vi.fn();
    NotificationCenterUtil.on(listener);
    NotificationCenterUtil.off(listener);

    NotificationCenterUtil.emit('Logout');

    expect(listener).not.toHaveBeenCalled();
  });

  test('should emit an event', () => {
    const listener = vi.fn();
    NotificationCenterUtil.on(listener);

    NotificationCenterUtil.emit('LocaleChanged');

    expect(listener).toHaveBeenCalledWith('LocaleChanged');
  });
});
