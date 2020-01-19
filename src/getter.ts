import { Target } from './target';

export interface Getter<
  V,
  PropertyName extends string | number | (string | number)[],
  R = Target<V, PropertyName>
> {
  <T extends R>(t: T): V;
  focus: PropertyName;
}

export function getter<PropertyName extends number>(
  focus: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter<PropertyName extends string>(
  focus: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter(focus) {
  return () => Object.assign(t => (t ? t[focus] : undefined), { focus });
}
