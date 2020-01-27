import { Target, PathType, Value } from './target';

export default abstract class Lens<V, PropertyName, T extends PathType> {
  abstract get<S extends Target<T, PropertyName, V>>(s: S): Value<T, V>;

  abstract set<S extends Target<T, PropertyName, V>>(s: S, v: Value<T, V>): S;

  abstract getPathType(): T;
}
