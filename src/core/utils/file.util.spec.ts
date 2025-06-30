import { describe, it, expect } from 'vitest';
import { FileUtil } from './file.util';

describe('FileUtil', () => {
  it('compare Base64 convert', async () => {
    const testText = 'test';
    const testType = 'plain/text';
    const testBase64String = Buffer.from(testText).toString('base64');
    const blob = FileUtil.base64ToBlob(testBase64String, testType);
    const expectString = await FileUtil.blobToBase64(blob);
    expect(expectString).toEqual(`data:${testType};base64,${testBase64String}`);
  });
});
