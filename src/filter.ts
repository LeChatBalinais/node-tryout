import { ValueProvider } from './value-provider';
import { KeyRestrictionExt } from './key-restriction';

export type Filter<S, V> = (s: S, v: V) => V;

export function filter<V>(f: (v?: V) => V): Filter<any, V>;

export function filter<V1, P1 extends KeyRestrictionExt, GR1, V>(
  getters: [ValueProvider<V1, P1, GR1>],
  f: (gv1: V1, v?: V) => V
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
  getters: [ValueProvider<V1, P1, GR1>, ValueProvider<V2, P2, GR2>],
  f: (gv1: V1, gv2: V2, v?: V) => V
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
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, v?: V) => V
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
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>,
    ValueProvider<V4, P4, GR4>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, v?: V) => V
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
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>,
    ValueProvider<V4, P4, GR4>,
    ValueProvider<V5, P5, GR5>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5, v?: V) => V
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
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>,
    ValueProvider<V4, P4, GR4>,
    ValueProvider<V5, P5, GR5>,
    ValueProvider<V6, P6, GR6>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5, gv6: V6, v?: V) => V
): Filter<GR1 & GR2 & GR3 & GR4 & GR5 & GR6, V>;

export function filter(...args) {
  if (args.length === 1) {
    if (args[0].length === 0) return (s, v) => args[0]();
    return (s, v) => args[0](v);
  }

  if (args[0].length === args[1].length)
    return (s, v) => args[1](...args[0].map(g => g(s)));

  return (s, v) => args[1](...args[0].map(g => g(s)), v);
}
