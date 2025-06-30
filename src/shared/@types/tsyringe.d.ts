/* eslint-disable @typescript-eslint/no-explicit-any */
import * as tsyringe from 'tsyringe';

// Overwrite wrong declaration from tsyringe, support typescript 5.x
// Remove this when library will update
declare module 'tsyringe' {
  function inject(
    token: tsyringe.InjectionToken<any>
  ): (
    target: any,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => any;
}
