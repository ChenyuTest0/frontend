/* eslint-disable @typescript-eslint/no-explicit-any */
import './loading.scss';

function addLoader(elem: any, loaderHtml: any) {
  const styles = getComputedStyle(elem);

  const loaders = elem.querySelectorAll('.v-l-loader');
  if (loaders.length > 0) {
    return;
  }

  if (styles.position === 'static') {
    elem.classList.add('v-l-pos-rel');
  }

  const loaderElem = document.createElement('div');
  loaderElem.classList.add('v-l-loader');
  loaderElem.classList.add('v-l-center-content');
  loaderElem.innerHTML = loaderHtml;
  elem.appendChild(loaderElem);
}

function removeLoader(elem: any) {
  try {
    elem.classList.remove('v-l-pos-rel');
    const loaders = elem.querySelectorAll('.v-l-loader');
    [...loaders].forEach(loader => elem.removeChild(loader));
  } catch (error) {
    console.log(error);
  }
}

function getLoaderContentHtml(options?: any) {
  const defaultSpinnerHtml = `
    <svg class="v-l-spinner" width="40" height="40" viewBox="0 0 50 50">
      <circle
        class="v-l-circle" cx="25" cy="25" r="19" fill="none" stroke-linecap="round" stroke="currentColor"
      ></circle>
    </svg>
  `;

  let html = defaultSpinnerHtml;

  if (options?.loaderHtml) {
    html = options.loaderHtml;
  }

  if (!options?.disableRotate) {
    html = `<div class="v-l-rotating v-l-center-content">${html}</div>`;
  }

  html = `<div class="v-l-scale v-l-center-content">${html}</div>`;

  return html;
}

export const loadingDirective = (options?: any) => {
  const loaderHtmlContent = getLoaderContentHtml(options);
  return {
    mounted(el: any, binding: any) {
      if (binding.value) addLoader(el, loaderHtmlContent);
      if (!binding.value) removeLoader(el);
    },
    updated(el: any, binding: any) {
      if (binding.value) addLoader(el, loaderHtmlContent);
      if (!binding.value) removeLoader(el);
    },
    unmounted(el: any) {
      removeLoader(el);
    }
  };
};
