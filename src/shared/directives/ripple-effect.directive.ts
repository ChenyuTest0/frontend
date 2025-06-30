/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import './ripple-effect.scss';
/**
 * ripple effectを実現するdirective
 *
 * position: relative;
 * overflow: hidden;
 * のCSSが定義されているButtonタグに有効
 *
 * @export
 */
export const rippleEffectDirective = {
  beforeMount(el: any) {
    el.rippleEffectEvent = (event: any) => {
      const btn = event.currentTarget;

      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
      circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
      circle.classList.add('ripple');

      const ripple = btn.getElementsByClassName('ripple')[0];
      if (ripple) {
        ripple.remove();
      }
      btn.appendChild(circle);
    };
    el.addEventListener('click', el.rippleEffectEvent);
  },
  unmounted(el: any) {
    el.removeEventListener('click', el.rippleEffectEvent);
  }
};
