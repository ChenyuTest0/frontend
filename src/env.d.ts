/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<undefined, undefined, any>;
  export default component;
}

declare module '*.yaml' {
  const value: Record<string, any>;
  export default value;
}
declare module '*.yml' {
  const value: Record<string, any>;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_NETWORK_TIMEOUT: number;
  readonly VITE_CONSOLE_LOG_LEVEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
