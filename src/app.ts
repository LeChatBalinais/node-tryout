import { array } from './y/array';
import { lens } from './y/lens';
import { ValueType } from './z/target';
import { telescope } from './y/telescope';

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

// ===========================================================

// interface A {
//   v: number;
// }

// interface B {
//   v: number;
//   w: string;
// }

// function* keyGenA({ ap }: { ap: number }) {
//   yield ap;
// }

// function* keyGenB({ bp }: { bp: string }) {
//   yield bp;
// }

// const a = lens<A>()('a', ValueType.Array, keyGenA);
// const b = lens<B>()('b', ValueType.AssociativeArray, keyGenB);

// const v = lens<number>()('v');
// const w = lens<string>()('w');

// const ab = array(a, b);

// const t = telescope(ab, v);
// console.log(
//   t.view({ a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } }, { ap: 0, bp: 'one' })
// );

// t.viewOver(
//   { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
//   (hr: number) => console.log(hr),
//   {
//     ap: 0,
//     bp: 'one'
//   }
// );

// let res = t.set(
//   { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
//   [[4], { one: 5 }],
//   {
//     ap: 0,
//     bp: 'one'
//   }
// );

// console.log(res.b.one);

// console.log(res.a);

// res = t.setOver(
//   { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
//   (vv: number): number => vv + 4,
//   {
//     ap: 0,
//     bp: 'one'
//   }
// );

// console.log(res);
