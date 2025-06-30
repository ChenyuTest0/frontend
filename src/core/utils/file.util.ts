/**
 * Version Check Utils
 *
 * @export
 * @class VersionUtil
 */
export class FileUtil {
  /**
   * Base64 string to Blob
   *
   * @static
   * @param {string} base64
   * @param {string} type
   * @returns {Blob}
   * @memberof FileUtil
   */
  public static base64ToBlob(
    b64Data: string,
    contentType: string,
    sliceSize = 512
  ): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  /**
   * Blob to Base64 string
   *
   * @static
   * @param {Blob} blob
   * @returns {Promise<string>}
   * @memberof FileUtil
   */
  public static blobToBase64(blob: Blob): Promise<string> {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        const result = temporaryFileReader?.result?.toString();
        resolve(result ? result : '');
      };
      temporaryFileReader.readAsDataURL(blob);
    });
  }
}
