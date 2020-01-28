import { Target, PathType, Value, Focus } from './target';

export default abstract class Lens<
  V,
  PropertyName,
  T extends PathType,
  R = Target<T, PropertyName, V>,
  F = Focus<T, PropertyName>
> {
  abstract get<S extends R>(s: S): Value<T, V>;

  abstract set<S extends R>(s: S, v: Value<T, V>): S;

  abstract getPathType(): T;

  abstract getFocus(): F;
}
