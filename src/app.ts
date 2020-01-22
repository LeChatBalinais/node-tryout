import { lens } from './lens';
import { getter } from './getter';
import { filter } from './filter';
import { condition } from './condition';
import { focusedReducers } from './focused-reducer';
import { reducer } from './reducer';

const b = { a: 2, b: 3, c: 'string' };

const rd = focusedReducers([
  {
    lens: lens(getter('a')<number>()),
    filter: filter((gv1: number, v: number): number => gv1 + v + 5, [
      getter('b')<number>()
    ])
  },
  {
    lens: lens(getter('c')<string>()),
    condition: condition((gv1: number) => gv1 > 1, [getter('b')<number>()]),
    filter: filter((gv1: number, v: string): string => gv1 + v, [
      getter('b')<number>()
    ])
  }
]);

const r = reducer(...rd);

console.log(r(b));
