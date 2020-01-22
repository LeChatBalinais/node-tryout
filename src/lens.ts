import { Target, DynamicTarget } from './target';
import { Getter } from './getter';
import { KeyRestrictionExt } from './key-restriction';

export type Setter<
  V,
  PropertyName extends KeyRestrictionExt,
  R = Target<V, PropertyName>
> = <T extends R>(t: T, v: V, transient?: boolean) => T;

export type Lens<
  V,
  PropertyName extends KeyRestrictionExt,
  R = Target<V, PropertyName>
> = Getter<V, PropertyName, R> & Setter<V, PropertyName, R>;

export type DynamicLens<V> = <
  PropertyName extends number | string,
  R = DynamicTarget<V, PropertyName>
>(
  focus: PropertyName
) => Lens<V, PropertyName, R>;

function setter(focus) {
  return (t, v, transient = false) => {
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
}

function makeLens(g) {
  const { focus } = g;
  const s = setter(focus);
  return (...args) => {
    if (args.length === 1) return g(args[0]);
    if (args.length === 2) return s(args[0], args[1]);
    return s(args[0], args[1], args[2]);
  };
}

export function lens<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
>(g: Getter<V, PropertyName, R>): Lens<V, PropertyName, R>;

export function lens<V>(
  g: <PropertyName extends number | string, R = DynamicTarget<V, PropertyName>>(
    focus: PropertyName
  ) => Getter<V, PropertyName, R>
): DynamicLens<V>;

export function lens(g) {
  if (g.focus === undefined) {
    return focus => {
      const gtr = g(focus);

      return makeLens(gtr);
    };
  }
  return makeLens(g);
}

export function view<V, PropertyName extends KeyRestrictionExt, R>(
  l: Lens<V, PropertyName, R>,
  t: R
): V {
  return l(t);
}

export function set<V, PropertyName extends KeyRestrictionExt, R>(
  l: Lens<V, PropertyName, R>,
  t: R,
  v: V
): R {
  return l(t, v);
}

export function over<V, PropertyName extends KeyRestrictionExt, R>(
  l: Lens<V, PropertyName, R>,
  t: R,
  fn: (v: V) => V
): R {
  return set(l, t, fn(view(l, t)));
}
