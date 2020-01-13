import { Target } from './target';

export type Getter<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
> = <T extends R>(t: T) => V;

export function getter<PropertyName extends number>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter<PropertyName extends string>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter(propName) {
  return () => t => t[propName];
}
