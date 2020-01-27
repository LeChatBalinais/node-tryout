import Lens from './lens';
import { PathType, Target } from './target';

export default class LensSequence<
  V,
  P extends string | number,
  T extends PathType
> extends Lens<V, P, T> {
  pathType: T;

  getFunc : get<S extends Target<T, PropertyName, V> >(s: S) => Value<T, V>

  constructor( pathType: T) {
    super();
    this.pathType = pathType;
  }

  get<S extends Target<T, PropertyName, V>>(s: S): Value<T, V> {

  }

  set<S extends Target<T, PropertyName, V>>(s: S, v: Value<T, V>): S {}

  getPathType(): T {
    return this.pathType;
  }
}
