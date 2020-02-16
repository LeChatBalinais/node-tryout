import { lens } from './z/lens';
import { ValueType } from './z/target';
import { telescope } from './z/telescope';

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

interface E {
  e: number;
}

interface D {
  d: { [ID in string]: E };
}

interface C {
  c: D[];
}

interface B {
  b: C[];
}

interface A {
  a: { [ID in string]: B };
}

function* keyGenC() {
  yield 0;
}

function* keyGenD() {
  yield 'Dras';
}

const a = lens<B>()('a', ValueType.AssociativeArray, undefined);
const b = lens<C>()('b', ValueType.Array, undefined);
const c = lens<D>()('c', ValueType.Array, keyGenC);
const d = lens<E>()('d', ValueType.AssociativeArray, keyGenD);
const e = lens<number>()('e', ValueType.Simple, undefined);

const tlscp = telescope(a, b, c, d, e);

const obj = {
  a: {
    Aras: {
      b: [{ c: [{ d: { Dras: { e: 1 } } }] }]
    },
    Adva: {
      b: [
        { c: [{ d: { Dras: { e: 1 }, Ddva: { e: 2 } } }] },
        { c: [{ d: { Dras: { e: 1 } } }] }
      ]
    },
    Atri: {
      b: [{ c: [{ d: { Dras: { e: 1 } } }] }]
    }
  }
};

console.log(tlscp.view(obj));
