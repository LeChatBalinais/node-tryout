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
// import { staticLens } from './x/static-lens';
// import { dynamicLens } from './x/dynamic-lens';
// import { lensSequence } from './x/lens-sequence';

// const a = staticLens<{ b: number }>()('a');
// const b = staticLens<number>()('b');

// console.log(a.get({ a: { b: 3 } }));
// console.log(a.set({ a: { b: 3 } }, { b: 5 }));

// const ab = lensSequence([a, b]);

// console.log('seq: ', ab.get({ a: { b: 3 } }));

// const ds = [0, 2];

// const ad = (mm: number[]) => {
//   return (): number[] => {
//     return mm;
//   };
// };

// const generator = ad([0, 1]);

// const gen = (): string[] => {
//   return ['e', 'm'];
// };

// const m = dynamicLens<string>()(generator);

// const f = dynamicLens<number>()(gen);

// console.log(m.get(['s', 'd', 'g']));

// console.log(m.get([]));
// console.log(m.set(['s', 'd', 'g'], ['u', 'v']));

// console.log(f.get({ e: 3, ds: 9, m: 8 }));
// console.log(f.set({ e: 3, ds: 9, m: 8 }, [7, 4]));

// console.log({ a: 1, b: 'set', c: undefined });
// const m;

import { lens } from './z/lens';
import { ValueType } from './z/target';

const a = lens<number>()('a', ValueType.Simple, undefined);

console.log(a.view({ a: 3 }));
console.log(a.set({ a: 3 }, 5));

a.viewOver({ a: 3 }, (v: number) => console.log(v));

console.log(a.setOver({ a: 3 }, (v: number) => v + 2));

const b = lens<number>()('b', ValueType.Array, undefined);

console.log(b.view({ b: [8, 7] }));
console.log(b.set({ b: [8, 7] }, [5, 6]));

b.viewOver({ b: [8, 7] }, (v: number) => console.log(v));

console.log(b.setOver({ b: [8, 7] }, (v: number) => v + 2));

const c = lens<number>()('c', ValueType.AssociativeArray, undefined);

console.log(c.view({ c: { a: 8, b: 7 } }));
console.log(c.set({ c: { a: 8, b: 7 } }, { c: 9, d: 10 }));

c.viewOver({ c: { a: 8, b: 7 } }, (v: number) => console.log(v));

console.log(c.setOver({ c: { a: 8, b: 7 } }, (v: number) => v + 2));

function* keyGen() {
  yield 1;
  yield 3;
}

const d = lens<number>()('d', ValueType.Array, keyGen);

console.log(d.view({ d: [1, 2, 3, 4] }));

const arrToAssign = [];

arrToAssign[1] = 0;
arrToAssign[3] = 0;

console.log(d.set({ d: [1, 2, 3, 4] }, arrToAssign));

d.viewOver({ d: [1, 2, 3, 4] }, (v: number) => console.log(v));

console.log(d.setOver({ d: [1, 2, 3, 4] }, (v: number) => v + 2));
