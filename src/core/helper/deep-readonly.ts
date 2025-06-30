export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }; // @microsoft/TypeScript/#13923
