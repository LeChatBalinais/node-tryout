import { lens, Lens } from './lens';
import { getter, Getter } from './getter';
import { KeyRestriction } from './key-restriction';

const b = { a: 1, b: 3 };

function filter<V1, V, P1 extends KeyRestriction, GR1>(
  f: (gv1: V1, v?: V) => V,
  getters: [Getter<V1, P1, GR1>]
): (s: GR1, v?: V) => V {
  return (s: GR1, v?: V): V => f(getters[0](s), v);
}

interface LensReducer<V, P extends KeyRestriction, LR, FR, R = LR | FR> {
  lens: Lens<V, P, LR>;
  filter: (s: FR, v?: V) => V;
}

const rd = [
  {
    lens: lens(getter('a')<number>()),
    filter: filter((gv1: number): number => gv1 + 5, [getter('a')<number>()])
  }
];

function reduce<V, P extends KeyRestriction, LR, FR, R = LR | MR>({
  lens: lens1,
  filter: filter1
}: LensReducer<V, P, LR, FR, R>): <S extends R>(s: S) => S {
  return <S extends R>(s: S): S => {
    return lens1(s, filter1(s));
  };
}

const r = reduce(rd[0]);

console.log(r(b));
