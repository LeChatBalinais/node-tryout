import { Lens } from './lens';
import { Getter } from './getter';

// type Transducer<R> = <T extends R>(t: T) => T;

// type Configurator<R> = <T extends R>(t: T) => [];

// type MakeLens<V, P extends string | number | (string | number)[], R> = (
//   t: R
// ) => Lens<V, P, R>;

// export default function makeLens<
//   V1,
//   P1 extends string | number | (string | number)[],
//   R1,
//   V,
//   P extends string | number | (string | number)[],
//   R extends R1
// >(
//   determineLens: (arg1: V1) => Lens<V, P, R>,
//   getters: [Getter<V1, P1, R1>]
// ): MakeLens<V, P, R> {
//   return (t: R): Lens<V, P, R> => determineLens(getters[0](t));
// }

// interface LensFilter<V, P extends string | number | (string | number)[], R> {
//     l: Lens<V, P, R> | () => Lens<V, P, R>;
//     f: <T extends R>(t: T) => T;
//   }

// export default function transducer<
//   V,
//   P extends string | number | (string | number)[],
//   R
// >(lens: Lens<V, P, R>): Transducer<R> {}
// // export function tr1<

// {
// }
