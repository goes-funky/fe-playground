import { finalize, tap } from "rxjs";

/**
 * Wraps a function with Pipe that triggers Subject that responsible for displaying a loader. 
 * BTW runs http tick Subject for counter TimerComponent
 * @returns Observable<T>
 */
export function Loadable(): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      (<any>this)['loading$$'].next(true);

      return original.apply(this, args).pipe(
        tap(() => (<any>this)['requestTick$'].next()),
        finalize(() => (<any>this)['loading$$'].next(false)),
      );
    };

    return descriptor;
  };
}
