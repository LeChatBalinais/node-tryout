import { ValueProvider } from './value-provider';
import { KeyRestrictionExt } from './key-restriction';

export type Condition<S> = (s: S) => boolean;

export function condition<V1, P1 extends KeyRestrictionExt, GR1>(
  getters: [ValueProvider<V1, P1, GR1>],
  f: (gv1: V1) => boolean
): Condition<GR1>;

export function condition<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  S
>(
  getters: [ValueProvider<V1, P1, GR1>, ValueProvider<V2, P2, GR2>],
  f: (gv1: V1, gv2: V2) => boolean
): Condition<GR1 & GR2>;

export function condition<
  V1,
  P1 extends KeyRestrictionExt,
  GR1,
  V2,
  P2 extends KeyRestrictionExt,
  GR2,
  V3,
  P3 extends KeyRestrictionExt,
  GR3,
  S
>(
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3) => boolean
): Condition<GR1 & GR2 & GR3>;

export function condition<
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
  S
>(
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>,
    ValueProvider<V4, P4, GR4>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4) => boolean
): Condition<GR1 & GR2 & GR3 & GR4>;

export function condition<
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
  S
>(
  getters: [
    ValueProvider<V1, P1, GR1>,
    ValueProvider<V2, P2, GR2>,
    ValueProvider<V3, P3, GR3>,
    ValueProvider<V4, P4, GR4>,
    ValueProvider<V5, P5, GR5>
  ],
  f: (gv1: V1, gv2: V2, gv3: V3, gv4: V4, gv5: V5) => boolean
): Condition<GR1 & GR2 & GR3 & GR4 & GR5>;

export function condition(getters, f) {
  return s => f(...getters.map(g => g(s)));
}
