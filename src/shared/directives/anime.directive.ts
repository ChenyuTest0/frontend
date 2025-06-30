/* eslint-disable @typescript-eslint/no-explicit-any */
import animejs from 'animejs';

/**
 * Anime.jsをテンプレートから操作するDirective
 *
 * @export
 */
export const animeDirective = {
  mounted(el: any, binding: any) {
    const opts = Object.assign({}, binding.value, { targets: el });
    animejs(opts);
  },
  unmounted(el: any, binding: any) {
    const opts = Object.assign({}, binding.value, { targets: el });
    animejs(opts);
  }
};
