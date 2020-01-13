import { Getter } from './getter';

export function getterArray<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(g1: Getter<V2, P2, R>, g2: Getter<V1, P1, R>): Getter<[V2, V1], [P2, P1], R>;

export function getterArray(...getters) {
  return t => {
    return [...getters.map(getter => getter(t))];
  };
}
