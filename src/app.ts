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

// const r = reducer(rd);

// console.log(r(o));

// const a = lens<number>()('a');
// const b = lens<string>()('b');

// const ar = array(a, b);
// console.log(ar.focus);
// console.log(ar.valueType);

// console.log(ar.view({ a: 1, b: 'one' }));

// ar.viewOver({ a: 1, b: 'one' }, [
//   (v: number) => console.log(v),
//   (v: string) => console.log(v)
// ]);

// console.log(ar.set({ a: 1, b: 'one' }, [2, 'two']));

// const s = { a: 1, b: 'one' };

// ar.setTransient(s, [2, 'two']);

// console.log(s);

// console.log(ar.setOver(s, [(v: number) => v + 1, (v: string) => v.toUpperCase()]));

// ar.setOverTransient(s, [(v: number) => v + 1, (v: string) => v.toUpperCase()]);

// console.log(s);

// ===========================================================

// function* keyGenA({ ap }: { ap: number }) {
//   yield ap;
// }

// function* keyGenB({ bp }: { bp: string }) {
//   yield bp;
// }

// const a = lens<number>()('a', ValueType.Array, keyGenA);
// const b = lens<string>()('b', ValueType.AssociativeArray, keyGenB);

// const ar = array(a, b);

// console.log(
//   ar.view(
//     { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
//     { ap: 0, bp: 'one' }
//   )
// );

// ar.viewOver(
//   { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
//   [(v: number) => console.log(v), (v: string) => console.log(v)],
//   { ap: 0, bp: 'one' }
// );

// console.log(
//   ar.set(
//     { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
//     [[5], { one: 'yes' }],
//     { ap: 0, bp: 'one' }
//   )
// );

// const s = { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } };

// ar.setTransient(s, [[2], { one: 'two' }], { ap: 0, bp: 'one' });

// console.log(s);

// console.log(
//   ar.setOver(s, [(v: number) => v + 1, (v: string) => v.toUpperCase()], {
//     ap: 0,
//     bp: 'one'
//   })
// );

// ar.setOverTransient(s, [(v: number) => v + 1, (v: string) => v.toUpperCase()], {
//   ap: 0,
//   bp: 'one'
// });

// console.log(s);

// ===========================================================

// function* keyGenA({ ap }: { ap: number }) {
//   yield ap;
// }

// function* keyGenB({ bp }: { bp: string }) {
//   yield bp;
// }

// const a = lens<number>()('a', ValueType.Array, keyGenA);
// const b = lens<string>()('b', ValueType.AssociativeArray, keyGenB);

// const c = lens<number>()('c');
// const d = lens<string>()('d');

// const ab = array(a, b);

// const cd = array(c, d);

// const abcd = array(ab, cd);

// console.log(
//   abcd.view(
//     { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' },
//     { ap: 0, bp: 'one' }
//   )
// );

// abcd.viewOver(
//   { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' },
//   [
//     [(v: number) => console.log(v), (v: string) => console.log(v)],
//     [(v: number) => console.log(v), (v: string) => console.log(v)]
//   ],
//   { ap: 0, bp: 'one' }
// );

// console.log(
//   abcd.set(
//     { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' },
//     [
//       [[5], { one: 'yes' }],
//       [6, 'dsfsd']
//     ],
//     { ap: 0, bp: 'one' }
//   )
// );

// const s = { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' };

// abcd.setTransient(
//   s,
//   [
//     [[5], { one: 'yes' }],
//     [6, 'dsfsd']
//   ],
//   { ap: 0, bp: 'one' }
// );

// console.log(s);

// console.log(
//   abcd.setOver(
//     s,
//     [
//       [(v: number) => v + 1, (v: string) => v.toUpperCase()],
//       [(v: number) => v + 1, (v: string) => v.toUpperCase()]
//     ],
//     {
//       ap: 0,
//       bp: 'one'
//     }
//   )
// );

// abcd.setOverTransient(
//   s,
//   [
//     [(v: number) => v + 10, (v: string) => v.toLowerCase()],
//     [(v: number) => v + 10, (v: string) => v.toLowerCase()]
//   ],
//   {
//     ap: 0,
//     bp: 'one'
//   }
// );

// console.log(s);

// ===========================================================

interface A {
  v: number;
}

interface B {
  v: number;
  w: string;
}

function* keyGenA({ ap }: { ap: number }) {
  yield ap;
}

function* keyGenB({ bp }: { bp: string }) {
  yield bp;
}

const a = lens<A>()('a', ValueType.Array, keyGenA);
const b = lens<B>()('b', ValueType.AssociativeArray, keyGenB);

const v = lens<number>()('v');
const w = lens<string>()('w');

const ab = array(a, b);

const t = telescope(ab, v);
console.log(
  t.view({ a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } }, { ap: 0, bp: 'one' })
);

t.viewOver(
  { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
  (hr: number) => console.log(hr),
  {
    ap: 0,
    bp: 'one'
  }
);

console.log(
  t.set({ a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } }, [[4], { one: 5 }], {
    ap: 0,
    bp: 'one'
  })
);
