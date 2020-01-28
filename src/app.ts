// import { lens } from './lens';
// import { getter } from './getter';
// import { filter } from './filter';
// import { condition } from './condition';
// import { focusedReducers } from './focused-reducer';
// import { reducer } from './reducer';

// const o = { a: 2, b: 3, c: 'string' };

// const lns = {
//   a: lens(getter('a')<number>()),
//   b: lens(getter('b')<number>()),
//   c: lens(getter('c')<string>())
// };

// const rd = focusedReducers([
//   {
//     focus: lns.a,
//     filter: filter([lns.b], (b: number, v: number): number => b + v + 5)
//   },
//   {
//     focus: lns.c,
//     condition: condition(
//       [lns.b, lns.c],
//       (b: number, c: string) => b > 1 && c.length !== 0
//     ),
//     filter: filter([lns.b], (b: number, c: string): string => b + c)
//   }
// ]);

// const r = reducer(rd);

// console.log(r(o));
import { staticLens } from './x/static-lens';
import { dynamicLens } from './x/dynamic-lens';
import { lensSequence } from './x/lens-sequence';

const a = staticLens<{ b: number }>()('a');
const b = staticLens<number>()('b');

console.log(a.get({ a: { b: 3 } }));
console.log(a.set({ a: { b: 3 } }, { b: 5 }));

const ab = lensSequence([a, b]);

console.log('seq: ', ab.get({ a: { b: 3 } }));

const ds = [0, 2];

const ad = (mm: number[]) => {
  return (): number[] => {
    return mm;
  };
};

const generator = ad([0, 1]);

const gen = (): string[] => {
  return ['e', 'm'];
};

const m = dynamicLens<string>()(generator);

const f = dynamicLens<number>()(gen);

console.log(m.get(['s', 'd', 'g']));

console.log(m.get([]));
console.log(m.set(['s', 'd', 'g'], ['u', 'v']));

console.log(f.get({ e: 3, ds: 9, m: 8 }));
console.log(f.set({ e: 3, ds: 9, m: 8 }, [7, 4]));

// const m;
