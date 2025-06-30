/**
 * Provides kana transform util.
 *
 * @export
 * @class KanaTransformUtil
 */
export class KanaTransformUtil {
  private static kanaDictionary: Record<string, string> = {
    を: 'ｦ',
    ぁ: 'ｱ',
    ぃ: 'ｲ',
    ぅ: 'ｳ',
    ぇ: 'ｴ',
    ぉ: 'ｵ',
    ゃ: 'ﾔ',
    ゅ: 'ﾕ',
    ょ: 'ﾖ',
    っ: 'ﾂ',
    ー: 'ｰ',
    あ: 'ｱ',
    い: 'ｲ',
    う: 'ｳ',
    え: 'ｴ',
    お: 'ｵ',
    か: 'ｶ',
    き: 'ｷ',
    く: 'ｸ',
    け: 'ｹ',
    こ: 'ｺ',
    さ: 'ｻ',
    し: 'ｼ',
    す: 'ｽ',
    せ: 'ｾ',
    そ: 'ｿ',
    た: 'ﾀ',
    ち: 'ﾁ',
    つ: 'ﾂ',
    て: 'ﾃ',
    と: 'ﾄ',
    な: 'ﾅ',
    に: 'ﾆ',
    ぬ: 'ﾇ',
    ね: 'ﾈ',
    の: 'ﾉ',
    は: 'ﾊ',
    ひ: 'ﾋ',
    ふ: 'ﾌ',
    へ: 'ﾍ',
    ほ: 'ﾎ',
    ま: 'ﾏ',
    み: 'ﾐ',
    む: 'ﾑ',
    め: 'ﾒ',
    も: 'ﾓ',
    や: 'ﾔ',
    ゆ: 'ﾕ',
    よ: 'ﾖ',
    ら: 'ﾗ',
    り: 'ﾘ',
    る: 'ﾙ',
    れ: 'ﾚ',
    ろ: 'ﾛ',
    わ: 'ﾜ',
    ん: 'ﾝ',
    '˝': 'ﾞ',
    '゜': 'ﾟ',
    が: 'ｶﾞ',
    ぎ: 'ｷﾞ',
    ぐ: 'ｸﾞ',
    げ: 'ｹﾞ',
    ご: 'ｺﾞ',
    ざ: 'ｻﾞ',
    じ: 'ｼﾞ',
    ず: 'ｽﾞ',
    ぜ: 'ｾﾞ',
    ぞ: 'ｿﾞ',
    だ: 'ﾀﾞ',
    ぢ: 'ﾁﾞ',
    づ: 'ﾂﾞ',
    で: 'ﾃﾞ',
    ど: 'ﾄﾞ',
    ば: 'ﾊﾞ',
    び: 'ﾋﾞ',
    ぶ: 'ﾌﾞ',
    べ: 'ﾍﾞ',
    ぼ: 'ﾎﾞ',
    ぱ: 'ﾊﾟ',
    ぴ: 'ﾋﾟ',
    ぷ: 'ﾌﾟ',
    ぺ: 'ﾍﾟ',
    ぽ: 'ﾎﾟ'
  };

  /**
   * Converts kana characters.
   *
   * @param {string} input
   * @returns {string}
   * @memberof KanaTransformUtil
   */
  public static convertKanaToHalfKana(input: string): string {
    const hiragana = KanaTransformUtil.katakanaToHiragana(input);
    return KanaTransformUtil.hiraganaToHalfwidthKatakana(hiragana);
  }

  /**
   * Convert hiragana to fullwidth katakana.
   * @param str Input string.
   */
  private static hiraganaToHalfwidthKatakana(str: string): string {
    return str.replace(
      /[\u3041-\u3096ー]/g,
      match => KanaTransformUtil.kanaDictionary[match]
    );
  }

  /**
   * Converts fullwidth katakana to hiragana.
   *
   * @param {string} input
   * @returns {string}
   * @memberof KanaTransformUtil
   */
  private static katakanaToHiragana(input: string): string {
    return input.replace(/[\u30a1-\u30f6]/g, match => {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }
}
