import { Lens } from './lens';
import { Getter } from './getter';
import { KeyRestrictionExt } from './key-restriction';

// type Transducer<R> = <T extends R>(t: T) => T;

// type Configurator<R> = <T extends R>(t: T) => [];

type MakeLens<V, P extends KeyRestrictionExt, R> = (t: R) => Lens<V, P, R>;

export default function makeLens<
  V1,
  P1 extends KeyRestrictionExt,
  R1,
  V,
  P extends KeyRestrictionExt,
  R extends R1
>(
  determineLens: (arg1: V1) => Lens<V, P, R>,
  getters: [Getter<V1, P1, R1>]
): MakeLens<V, P, R> {
  return (t: R): Lens<V, P, R> => determineLens(getters[0](t));
}

// interface LensFilter<V, P extends KeyRestriction, R> {
//     l: Lens<V, P, R> | () => Lens<V, P, R>;
//     f: <T extends R>(t: T) => T;
//   }

// export default function transducer<
//   V,
//   P extends KeyRestriction,
//   R
// >(lens: Lens<V, P, R>): Transducer<R> {}
// // export function tr1<

// {
// }
