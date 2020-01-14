import produce from 'immer';
import { Setter } from './setter';

export function setterArray<
  V1,
  P1 extends string | number,
  R1,
  V2,
  P2 extends string | number,
  R2,
  R extends R1 & R2
>(
  g1: Setter<V2, P2, R1>,
  g2: Setter<V1, P1, R2>
): Setter<[V2, V1], [P2, P1], R>;

export function setterArray(...setters) {
  return (t, v) => {
    return produce(t, draftT => {
      setters.forEach((setter, i) => setter(draftT, v[i], true));
    });
  };
}
