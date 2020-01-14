import { Target } from './target';

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
