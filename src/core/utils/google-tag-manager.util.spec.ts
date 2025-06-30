import { container } from 'tsyringe';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { GoogleTagManagerUtil } from './google-tag-manager.util'; // Adjust the path to your file

describe('GoogleTagManagerUtil', () => {
  let gtmUtil: GoogleTagManagerUtil;
  const mockGtmId = 'GTM-XXXXXX';

  beforeEach(() => {
    container.register('GoogleTagManagerId', { useValue: mockGtmId });
    gtmUtil = container.resolve(GoogleTagManagerUtil);
  });

  test('should initialize with provided GTM ID', () => {
    expect(gtmUtil['gtmId']).toBe(mockGtmId);
  });

  test('should get dataLayer', () => {
    const dataLayer = gtmUtil.getDataLayer();
    expect(dataLayer).toBeInstanceOf(Array);
  });

  test('should push data to dataLayer', () => {
    const pushSpy = vi.spyOn(
      gtmUtil['browserGlobals'].windowRef()['dataLayer'],
      'push'
    );
    const testData = { event: 'testEvent' };
    gtmUtil['pushOnDataLayer'](testData);
    expect(pushSpy).toHaveBeenCalledWith(testData);
  });

  test('should add GTM script and iframe to DOM', () => {
    const doc = gtmUtil['browserGlobals'].documentRef();
    const createElementSpy = vi.spyOn(doc, 'createElement');
    const insertBeforeSpy = vi.spyOn(doc.head, 'insertBefore');
    const bodyInsertBeforeSpy = vi.spyOn(doc.body, 'insertBefore');

    gtmUtil.addGtmToDom();

    expect(createElementSpy).toHaveBeenCalledWith('script');
    expect(createElementSpy).toHaveBeenCalledWith('iframe');
    expect(createElementSpy).toHaveBeenCalledWith('noscript');
    expect(insertBeforeSpy).toHaveBeenCalled();
    expect(bodyInsertBeforeSpy).toHaveBeenCalled();
    expect(gtmUtil['isLoaded']).toBe(true);
  });
});
