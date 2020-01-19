import produce from 'immer';
import { Lens } from './lens';

export function lensSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(l1: Lens<V2, P2, R2>, l2: Lens<V1, P1, R1>): Lens<V1, P2, R2>;

export function lensSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3
>(
  g1: Lens<V3, P3, R3>,
  g2: Lens<V2, P2, R2>,
  g3: Lens<V1, P1, R1>
): Lens<V1, P3, R3>;

export function lensSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4
>(
  g1: Lens<V4, P4, R4>,
  g2: Lens<V3, P3, R3>,
  g3: Lens<V2, P2, R2>,
  g4: Lens<V1, P1, R1>
): Lens<V1, P4, R4>;

export function lensSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5
>(
  g1: Lens<V5, P5, R5>,
  g2: Lens<V4, P4, R4>,
  g3: Lens<V3, P3, R3>,
  g4: Lens<V2, P2, R2>,
  g5: Lens<V1, P1, R1>
): Lens<V1, P5, R5>;

export function lensSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5,
  V6 extends R5,
  P6 extends string | number,
  R6
>(
  g1: Lens<V6, P6, R6>,
  g2: Lens<V5, P5, R5>,
  g3: Lens<V4, P4, R4>,
  g4: Lens<V3, P3, R3>,
  g5: Lens<V2, P2, R2>,
  g6: Lens<V1, P1, R1>
): Lens<V1, P6, R6>;

export function lensSeries(...lenses) {
  return (...args) => {
    if (args.length === 1)
      return lenses.reduce(
        (accumulator, currentValue) => currentValue(accumulator),
        args[0]
      );

    let transient = false;
    let [t, v] = args;
    if (args.length === 3) {
      [t, v, transient] = args;
    }

    if (transient === false) {
      return produce(t, draftT => {
        const focused = lenses.reduce((accumulator, lens, i, array) => {
          return i === array.length - 1 ? accumulator : lens(accumulator);
        }, draftT);
        lenses[lenses.length - 1](focused, v, true);
      });
    }

    const focused = lenses.reduce(
      (accumulator, lens, i, array) =>
        i === array.length - 1 ? accumulator : lens(accumulator),
      t
    );
    lenses[lenses.length - 1](focused, v, true);

    return t;
  };
}
