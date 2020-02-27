import { telescope } from './y/telescope';
import { lens } from './y/lens';
import { ValueType } from './z/target';

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

type B = { b: number[] };

const s = { a: { one: { b: [3, 5] } } };

function* keyGenA() {
  yield 'one';
}

const a = lens<B>()('a', ValueType.AssociativeArray, keyGenA);

function* keyGenB({ bp }: { bp: number }) {
  yield bp;
}

const b = lens<number>()('b', ValueType.Array, keyGenB);

const tlscp = telescope(a, b);

tlscp.setTransient(s, { one: [, 9] }, { ap: 'one', bp: 1 });

console.log(tlscp.view(s, { ap: 'one', bp: 1 }));

tlscp.setOverTransient(s, (n: number) => 17, { ap: 'one', bp: 1 });

console.log(tlscp.view(s, { ap: 'one', bp: 1 }));

let result = 0;

console.log(tlscp.set(s, { one: [, 6] }, { ap: 'one', bp: 1 }).a);

console.log(tlscp.setOver(s, (n: number) => 13, { ap: 'one', bp: 1 }).a);

tlscp.viewOver(
  s,
  (n: number): void => {
    result += n;
  },
  { ap: 'one', bp: 1 }
);

console.log(result);
