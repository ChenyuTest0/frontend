/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, defineComponent } from 'vue';

export const Nl2br = defineComponent({
  name: 'Nl2Br',
  functional: true,
  props: {
    tag: { type: String, required: false, default: 'p' },
    text: { type: String, required: true },
    class: { type: String, required: false, default: '' }
  },
  setup(props) {
    return () =>
      h(
        props.tag,
        {
          class: props.class
        },
        props?.text
          ?.split(/(?:\r\n|\r|\n|\\n|\\r|\\r\\n)/)
          ?.reduce<any[]>((accumulator, value) => {
            if (!Array.isArray(accumulator) || accumulator.length <= 0) {
              return [accumulator, value];
            }
            return accumulator.concat([h('br'), value]);
          }, [])
      );
  }
});
