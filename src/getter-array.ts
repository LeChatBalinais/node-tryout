import { Getter } from './getter';

export function getterArray<
  V1,
  P1 extends string | number,
  R1,
  V2,
  P2 extends string | number,
  R2,
  R extends R1 & R2
>(
  g1: Getter<V2, P2, R1>,
  g2: Getter<V1, P1, R2>
): Getter<[V2, V1], [P2, P1], R>;

export function getterArray<
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
  g1: Getter<V3, P3, R3>,
  g2: Getter<V2, P2, R2>,
  g3: Getter<V1, P1, R1>
): Getter<[V3, V2, V1], [P3, P2, P1], R>;

export function getterArray<
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
  g1: Getter<V4, P4, R4>,
  g2: Getter<V3, P3, R3>,
  g3: Getter<V2, P2, R2>,
  g4: Getter<V1, P1, R1>
): Getter<[V4, V3, V2, V1], [P4, P3, P2, P1], R>;

export function getterArray<
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
  g1: Getter<V5, P5, R5>,
  g2: Getter<V4, P4, R4>,
  g3: Getter<V3, P3, R3>,
  g4: Getter<V2, P2, R2>,
  g5: Getter<V1, P1, R1>
): Getter<[V5, V4, V3, V2, V1], [P5, P4, P3, P2, P1], R>;

export function getterArray(...getters) {
  return t => {
    return [...getters.map(getter => getter(t))];
  };
}
