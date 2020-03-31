import { lens, opticalReducer, rule, condition } from './optics';

const o = { a: 2, b: 6, c: 'string' };

const lns = {
  a: lens<number>()('a'),
  b: lens<number>()('b'),
  c: lens<string>()('c')
};

console.log(
  opticalReducer([
    lns.a,
    rule((v: number): number => v + 1),
    condition((): boolean => false)
  ])(o)
);

console.log(
  opticalReducer([
    lns.c,
    rule(
      [lns.a.view, lns.b.view],
      (a: number, b: number, c: string): string => a + b + c
    ),
    condition(
      [lns.a.view, lns.b.view],
      (a: number, b: number): boolean => b + a > 3
    )
  ])(o)
);
