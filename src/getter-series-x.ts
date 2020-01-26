import { Getter } from './getter-x';

export function getterSeries<V1, R1, V2 extends R1, R2>(
  g1: Getter<V2, R2>,
  g2: Getter<V1, R1>
): Getter<V1, R2>;

export function getterSeries<V1, R1, V2 extends R1, R2, V3 extends R2, R3>(
  g1: Getter<V3, R3>,
  g2: Getter<V2, R2>,
  g3: Getter<V1, R1>
): Getter<V1, R3>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4
>(
  g1: Getter<V4, R4>,
  g2: Getter<V3, R3>,
  g3: Getter<V2, R2>,
  g4: Getter<V1, R1>
): Getter<V1, R4>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4,
  V5 extends R4,
  R5
>(
  g1: Getter<V5, R5>,
  g2: Getter<V4, R4>,
  g3: Getter<V3, R3>,
  g4: Getter<V2, R2>,
  g5: Getter<V1, R1>
): Getter<V1, R5>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4,
  V5 extends R4,
  R5,
  V6 extends R5,
  R6
>(
  g1: Getter<V6, R6>,
  g2: Getter<V5, R5>,
  g3: Getter<V4, R4>,
  g4: Getter<V3, R3>,
  g5: Getter<V2, R2>,
  g6: Getter<V1, R1>
): Getter<V1, R6>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4,
  V5 extends R4,
  R5,
  V6 extends R5,
  R6,
  V7 extends R6,
  R7
>(
  g1: Getter<V7, R7>,
  g2: Getter<V6, R6>,
  g3: Getter<V5, R5>,
  g4: Getter<V4, R4>,
  g5: Getter<V3, R3>,
  g6: Getter<V2, R2>,
  g7: Getter<V1, R1>
): Getter<V1, R7>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4,
  V5 extends R4,
  R5,
  V6 extends R5,
  R6,
  V7 extends R6,
  R7,
  V8 extends R7,
  R8
>(
  g1: Getter<V8, R8>,
  g2: Getter<V7, R7>,
  g3: Getter<V6, R6>,
  g4: Getter<V5, R5>,
  g5: Getter<V4, R4>,
  g6: Getter<V3, R3>,
  g7: Getter<V2, R2>,
  g8: Getter<V1, R1>
): Getter<V1, R8>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4,
  V5 extends R4,
  R5,
  V6 extends R5,
  R6,
  V7 extends R6,
  R7,
  V8 extends R7,
  R8,
  V9 extends R8,
  R9
>(
  g1: Getter<V9, R9>,
  g2: Getter<V8, R8>,
  g3: Getter<V7, R7>,
  g4: Getter<V6, R6>,
  g5: Getter<V5, R5>,
  g6: Getter<V4, R4>,
  g7: Getter<V3, R3>,
  g8: Getter<V2, R2>,
  g9: Getter<V1, R1>
): Getter<V1, R9>;

export function getterSeries<
  V1,
  R1,
  V2 extends R1,
  R2,
  V3 extends R2,
  R3,
  V4 extends R3,
  R4,
  V5 extends R4,
  R5,
  V6 extends R5,
  R6,
  V7 extends R6,
  R7,
  V8 extends R7,
  R8,
  V9 extends R8,
  R9,
  V10 extends R9,
  R10
>(
  g1: Getter<V10, R10>,
  g2: Getter<V9, R9>,
  g3: Getter<V8, R8>,
  g4: Getter<V7, R7>,
  g5: Getter<V6, R6>,
  g6: Getter<V5, R5>,
  g7: Getter<V4, R4>,
  g8: Getter<V3, R3>,
  g9: Getter<V2, R2>,
  g10: Getter<V1, R1>
): Getter<V1, R10>;

export function getterSeries(...getters) {
  return t => {
    return getters.reduce(
      (accumulator, currentValue) => currentValue(accumulator),
      t
    );
  };
}
