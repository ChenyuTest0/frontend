import { describe, expect, test, vi } from 'vitest';
import { UpdateDetector } from './update-detector.util';

describe('UpdateDetector', () => {
  test('should set previousHtmlHash if not set', async () => {
    const mockResponse = {
      status: 200,
      // eslint-disable-next-line sonarjs/no-duplicate-string
      text: async () => '<html></html>'
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await UpdateDetector.checkUpdatesInCode();

    expect(UpdateDetector['previousHtmlHash']).toBe(
      UpdateDetector['createHash']('<html></html>')
    );
  });

  test('should not update if html hash is the same', async () => {
    const mockResponse = {
      status: 200,
      text: async () => '<html></html>'
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await UpdateDetector.checkUpdatesInCode();
    const initialHash = UpdateDetector['previousHtmlHash'];

    await UpdateDetector.checkUpdatesInCode();
    expect(UpdateDetector['previousHtmlHash']).toBe(initialHash);
  });

  test('should call checkUpdatesInCode at specified interval', () => {
    const checkUpdatesInCodeSpy = vi.spyOn(
      UpdateDetector,
      'checkUpdatesInCode'
    );
    const setIntervalSpy = vi.spyOn(global, 'setInterval');

    UpdateDetector.checkUpdatesInCodeInterval(5000);

    expect(checkUpdatesInCodeSpy).toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 5000);
  });
});
