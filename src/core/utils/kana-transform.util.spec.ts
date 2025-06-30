import { describe, it, expect } from 'vitest';
import { KanaTransformUtil } from './kana-transform.util';

describe('KanaTransform', () => {
  it('convertKanaToHalfKana', () => {
    expect(
      KanaTransformUtil.convertKanaToHalfKana('あいうえおがぎぐげごサシスセソ')
    ).toEqual('ｱｲｳｴｵｶﾞｷﾞｸﾞｹﾞｺﾞｻｼｽｾｿ');
  });
});
