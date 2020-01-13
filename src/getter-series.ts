import { Getter } from './getter';

export function seriesOfGettersImpl(...getters) {
  return t => {
    return getters.reduce(
      (accumulator, currentValue) => currentValue(accumulator),
      t
    );
  };
}

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(g1: Getter<V2, P2, R2>, g2: Getter<V1, P1, R1>): Getter<V1, P2, R2>;

export function seriesOfGetters<
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
  g1: Getter<V3, P3, R3>,
  g2: Getter<V2, P2, R2>,
  g3: Getter<V1, P1, R1>
): Getter<V1, P3, R3>;

export function seriesOfGetters<
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
  g1: Getter<V4, P4, R4>,
  g2: Getter<V3, P3, R3>,
  g3: Getter<V2, P2, R2>,
  g4: Getter<V1, P1, R1>
): Getter<V1, P4, R4>;

export function seriesOfGetters<
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
  g1: Getter<V5, P5, R5>,
  g2: Getter<V4, P4, R4>,
  g3: Getter<V3, P3, R3>,
  g4: Getter<V2, P2, R2>,
  g5: Getter<V1, P1, R1>
): Getter<V1, P5, R5>;

export function seriesOfGetters<
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
  g1: Getter<V6, P6, R6>,
  g2: Getter<V5, P5, R5>,
  g3: Getter<V4, P4, R4>,
  g4: Getter<V3, P3, R3>,
  g5: Getter<V2, P2, R2>,
  g6: Getter<V1, P1, R1>
): Getter<V1, P6, R6>;

export function seriesOfGetters(...getters) {
  return seriesOfGettersImpl(...getters);
}
