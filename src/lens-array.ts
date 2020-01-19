import produce from 'immer';
import { Lens } from './lens';

export function lensArray<
  V1,
  P1 extends string | number,
  R1,
  V2,
  P2 extends string | number,
  R2,
  R extends R1 & R2
>(g1: Lens<V2, P2, R1>, g2: Lens<V1, P1, R2>): Lens<[V2, V1], [P2, P1], R>;

export function lensArray<
  V1,
  P1 extends string | number,
  R1,
  V2,
  P2 extends string | number,
  R2,
  V3,
  P3 extends string | number,
  R3,
  R extends R1 & R2 & R3
>(
  g1: Lens<V3, P3, R3>,
  g2: Lens<V2, P2, R2>,
  g3: Lens<V1, P1, R1>
): Lens<[V3, V2, V1], [P3, P2, P1], R>;

export function lensArray<
  V1,
  P1 extends string | number,
  R1,
  V2,
  P2 extends string | number,
  R2,
  V3,
  P3 extends string | number,
  R3,
  V4,
  P4 extends string | number,
  R4,
  R extends R1 & R2 & R3 & R4
>(
  g1: Lens<V4, P4, R4>,
  g2: Lens<V3, P3, R3>,
  g3: Lens<V2, P2, R2>,
  g4: Lens<V1, P1, R1>
): Lens<[V4, V3, V2, V1], [P4, P3, P2, P1], R>;

export function lensArray<
  V1,
  P1 extends string | number,
  R1,
  V2,
  P2 extends string | number,
  R2,
  V3,
  P3 extends string | number,
  R3,
  V4,
  P4 extends string | number,
  R4,
  V5,
  P5 extends string | number,
  R5,
  R extends R1 & R2 & R3 & R4 & R5
>(
  g1: Lens<V5, P5, R5>,
  g2: Lens<V4, P4, R4>,
  g3: Lens<V3, P3, R3>,
  g4: Lens<V2, P2, R2>,
  g5: Lens<V1, P1, R1>
): Lens<[V5, V4, V3, V2, V1], [P5, P4, P3, P2, P1], R>;

export function lensArray(...lenses) {
  return (...args) => {
    if (args.length === 1) return [...lenses.map(lens => lens(args[0]))];

    if (args.length === 2 || args[2] === false)
      return produce(args[0], draftT => {
        lenses.forEach((lens, i) => lens(draftT, args[1][i], true));
      });

    lenses.forEach((lens, i) => lens(args[0], args[1][i], true));
    return args[0];
  };
}
