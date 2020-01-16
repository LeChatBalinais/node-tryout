import { Target } from './target';
import {
  TargetValue,
  DefaultPropType,
  PropTypeRestriction,
  Link
} from './path';

export type Setter<
  V,
  PropertyName extends string | number | (string | number)[],
  R = Target<V, PropertyName>
> = <T extends R>(t: T, v: V, transient?: boolean) => T;

export function setter<PropertyName extends string>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Setter<V, PropertyName, R>;

export function setter<PropertyName extends number>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Setter<V, PropertyName, R>;

export function setter(propName) {
  return () => (t, v, transient = false) => {
    if (transient) {
      const s = t;
      s[propName] = v;
      return s;
    }
    if (Array.isArray(t))
      return [...t.slice(0, propName), v, ...t.slice(propName + 1)];

    return {
      ...t,
      [propName]: v
    };
  };
}

export function setterByLink<
  V,
  P extends string,
  T extends PropTypeRestriction<P> = DefaultPropType<P>
>(l: Link<V, P, T>): Setter<V, P, TargetValue<V, P, T>>;

export function setterByLink<
  V,
  P extends string,
  T extends PropTypeRestriction<P> = DefaultPropType<P>
>(l: Link<V, P, T>): Setter<V, P, TargetValue<V, P, T>>;

export function setterByLink(l: any): any {
  return (t, v, transient = false) => {
    const propName = l.val;
    if (transient) {
      const s = t;
      s[propName] = v;
      return s;
    }
    if (Array.isArray(t))
      return [...t.slice(0, propName), v, ...t.slice(propName + 1)];

    return {
      ...t,
      [propName]: v
    };
  };
}
