import { Subscription } from "rxjs";

const isFunction = (fn: Object) => typeof fn === "function";
const doUnsubscribe = (subscription: Subscription) => {
  subscription &&
    isFunction(subscription.unsubscribe) &&
    subscription.unsubscribe();
}

export function Unsubscribe({
  event = "ngOnDestroy"
} = {}) {
  return function(constructor: Function) {
    const original = constructor.prototype[event];

    if (!isFunction(original)) {
      throw new Error(
        `Implement please OnDestroy`
      );
    }

    constructor.prototype[event] = function() {
      isFunction(original) && original.apply(this, arguments);

      for (let propName in this) {
        doUnsubscribe(this[propName]);
      }
    };
  };
}