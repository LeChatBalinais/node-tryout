import { Target } from './target';
import {
  Link,
  PropTypeRestriction,
  DefaultPropType,
  TargetValue
} from './path';

export type Getter<
  V,
  PropertyName extends string | number | (string | number)[],
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

export function getterByLink<
  V,
  P extends string,
  T extends PropTypeRestriction<P> = DefaultPropType<P>
>(l: Link<V, P, T>): Getter<V, P, TargetValue<V, P, T>>;

export function getterByLink<
  V,
  P extends string,
  T extends PropTypeRestriction<P> = DefaultPropType<P>
>(l: Link<V, P, T>): Getter<V, P, TargetValue<V, P, T>>;

export function getterByLink(l: any): any {
  return t => t[l.val];
}
