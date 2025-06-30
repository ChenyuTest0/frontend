/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * マルチクリック防止ディレクティブ
 *
 * @export
 */
export const multipleClickPreventionDirective = {
  beforeMount(el: any) {
    const temp = el.style.pointerEvents;
    el.multipleClickPrevention = () => {
      el.style.pointerEvents = 'none';
      setTimeout(() => {
        el.style.pointerEvents = temp;
      }, 1000);
    };
    el.addEventListener('click', el.multipleClickPrevention);
  },
  unmounted(el: any) {
    el.removeEventListener('click', el.multipleClickPrevention);
  }
};
