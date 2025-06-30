/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { inject, singleton } from 'tsyringe';

export const InjectableKey = 'GoogleTagManagerId';

/**
 * GoogleTagManagerUtil
 *
 * @export
 * @class GoogleTagManagerUtil
 */
@singleton()
export class GoogleTagManagerUtil {
  private isLoaded = false;
  private gtmId: string;

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    }
  };

  /**
   *Creates an instance of GoogleTagManagerService.
   * @param {string} googleTagManagerId
   * @memberof GoogleTagManagerService
   */
  constructor(@inject('GoogleTagManagerId') googleTagManagerId: string) {
    this.gtmId = googleTagManagerId;
  }

  /**
   * Get dataLayer object.
   *
   * @returns {*}
   * @memberof GoogleTagManagerService
   */
  public getDataLayer(): any {
    const window = this.browserGlobals.windowRef();
    window['dataLayer'] = window['dataLayer'] || [];
    return window['dataLayer'];
  }

  /**
   * Push data on dataLayer.
   *
   * @private
   * @param {object} obj
   * @memberof GoogleTagManagerService
   */
  private pushOnDataLayer(obj: object): void {
    const dataLayer = this.getDataLayer();
    dataLayer.push(obj);
  }

  /**
   * Add gtm.js to dom.
   *
   * @memberof GoogleTagManagerService
   */
  public addGtmToDom(): void {
    const doc = this.browserGlobals.documentRef();
    this.pushOnDataLayer({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const gtmScript = doc.createElement('script');
    gtmScript.id = 'GTMScript';
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + this.gtmId;
    doc.head.insertBefore(gtmScript, doc.head.firstChild);

    const iframe = doc.createElement('iframe');
    iframe.setAttribute(
      'src',
      'https://www.googletagmanager.com/ns.html?id=' + this.gtmId
    );
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';

    const noscript = doc.createElement('noscript');
    noscript.id = 'GTMIframe';
    noscript.appendChild(iframe);

    doc.body.insertBefore(noscript, doc.body.firstChild);
    this.isLoaded = true;
  }

  /**
   * Push tag.
   *
   * @param {object} item
   * @memberof GoogleTagManagerService
   */
  public pushTag(item: object): void {
    if (!this.isLoaded) {
      this.addGtmToDom();
    }
    this.pushOnDataLayer(item);
  }
}
