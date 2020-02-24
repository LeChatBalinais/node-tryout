// import { lens } from './z/lens';
// import { ValueType } from './z/target';
// import { telescope } from './z/telescope';

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
