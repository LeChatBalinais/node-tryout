import { Getter } from './getter';
import { KeyRestrictionExt } from './key-restriction';

export type Filter<S, V> = (s: S, v: V) => V;

export function filter<V>(f: (v?: V) => V): Filter<any, V>;

export function filter<V1, P1 extends KeyRestrictionExt, GR1, V>(
  f: (gv1: V1, v?: V) => V,
  getters: [Getter<V1, P1, GR1>]
): Filter<GR1, V>;

export function filter<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  V
>(
  f: (gv1: V1, gv2: V2, v?: V) => V,
  getters: [Getter<V1, P1, GR1>, Getter<V2, P2, GR2>]
): Filter<GR1 & GR2, V>;

export function filter<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  V3,
  P3 extends KeyRestrictionExt,
  GR3,
  V
>(
  f: (gv1: V1, gv2: V2, gv3: V3, v?: V) => V,
  getters: [Getter<V1, P1, GR1>, Getter<V2, P2, GR2>, Getter<V3, P3, GR3>]
): Filter<GR1 & GR2 & GR3, V>;

export function filter<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  V3,
  P3 extends KeyRestrictionExt,
  GR3,
  V4,
  P4 extends KeyRestrictionExt,
  GR4,
  V
>(
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, v?: V) => V,
  getters: [
    Getter<V1, P1, GR1>,
    Getter<V2, P2, GR2>,
    Getter<V3, P3, GR3>,
    Getter<V4, P4, GR4>
  ]
): Filter<GR1 & GR2 & GR3 & GR4, V>;

export function filter<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  V3,
  P3 extends KeyRestrictionExt,
  GR3,
  V4,
  P4 extends KeyRestrictionExt,
  GR4,
  V5,
  P5 extends KeyRestrictionExt,
  GR5,
  V
>(
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5, v?: V) => V,
  getters: [
    Getter<V1, P1, GR1>,
    Getter<V2, P2, GR2>,
    Getter<V3, P3, GR3>,
    Getter<V4, P4, GR4>,
    Getter<V5, P5, GR5>
  ]
): Filter<GR1 & GR2 & GR3 & GR4 & GR5, V>;

export function filter<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  V3,
  P3 extends KeyRestrictionExt,
  GR3,
  V4,
  P4 extends KeyRestrictionExt,
  GR4,
  V5,
  P5 extends KeyRestrictionExt,
  GR5,
  V6,
  P6 extends KeyRestrictionExt,
  GR6,
  V
>(
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5, gv6: V6, v?: V) => V,
  getters: [
    Getter<V1, P1, GR1>,
    Getter<V2, P2, GR2>,
    Getter<V3, P3, GR3>,
    Getter<V4, P4, GR4>,
    Getter<V5, P5, GR5>,
    Getter<V6, P6, GR6>
  ]
): Filter<GR1 & GR2 & GR3 & GR4 & GR5 & GR6, V>;

export function filter(f, getters = []) {
  if (getters.length === 0) {
    if (f.length === 0) return (s, v) => f();
    return (s, v) => f(v);
  }

  if (f.length === getters.length)
    return (s, v) => f(...getters.map(g => g(s)));

  return (s, v) => f(...getters.map(g => g(s)), v);
}
