import { Target } from './target';
import { Getter } from './getter';

export type Setter<
  V,
  PropertyName extends string | number | (string | number)[],
  R = Target<V, PropertyName>
> = <T extends R>(t: T, v: V, transient?: boolean) => T;

export type Lens<
  V,
  PropertyName extends string | number | (string | number)[],
  R = Target<V, PropertyName>
> = Getter<V, PropertyName, R> & Setter<V, PropertyName, R>;

export function lens<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
>(g: Getter<V, PropertyName, R>): Lens<V, PropertyName, R>;

export function lens(g) {
  const { focus } = g;
  const s = (t, v, transient = false) => {
    if (!t) return t;
    if (transient) {
      const ts = t;
      ts[focus] = v;
      return ts;
    }
    if (Array.isArray(t))
      return [...t.slice(0, focus), v, ...t.slice(focus + 1)];

    return {
      ...t,
      [focus]: v
    };
  };
  return (...args) => {
    if (args.length === 1) return g(args[0]);
    if (args.length === 2) return s(args[0], args[1]);
    return s(args[0], args[1], args[2]);
  };
}

export function view<
  V,
  PropertyName extends string | number | (string | number)[],
  R
>(l: Lens<V, PropertyName, R>, t: R): V {
  return l(t);
}

export function set<
  V,
  PropertyName extends string | number | (string | number)[],
  R
>(l: Lens<V, PropertyName, R>, t: R, v: V): R {
  return l(t, v);
}

export function over<
  V,
  PropertyName extends string | number | (string | number)[],
  R
>(l: Lens<V, PropertyName, R>, t: R, fn: (v: V) => V): R {
  return set(l, t, fn(view(l, t)));
}
