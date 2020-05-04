import {
  lens,
  opticalReducer,
  rule,
  condition,
  inState,
  inPayload,
  selector,
  fiber,
  acitonReducer,
} from './optics';

const o = {
  state: { a: 2, b: 6, c: 'string', d: 'stringToo' },
  payload: { z: true },
};

const lns = {
  a: inState(lens<number>()('a')),
  b: inState(lens<number>()('b')),
  c: inState(lens<string>()('c')),
  d: inState(lens<string>()('d')),
  z: inPayload(lens<boolean>()('z')),
};

console.log(
  opticalReducer(
    fiber(
      lns.a,
      rule((v: number): number => v + 1),
      condition([lns.z.view], (z: boolean): boolean => z)
    )
  )(o)
);

const reducer = opticalReducer(
  fiber(
    lns.c,
    rule(
      [lns.a.view, lns.b.view],
      (a: number, b: number, c: string): string => a + b + c
    ),
    condition(
      [lns.a.view, lns.b.view, lns.z.view],
      (a: number, b: number, z: boolean): boolean => b + a > 3 && z
    )
  ),
  fiber(
    lns.d,
    rule(
      [lns.a.view, lns.b.view],
      (a: number, b: number, d: string): string => a + b + d
    ),
    condition(
      [lns.a.view, lns.b.view],
      (a: number, b: number): boolean => b + a > 3
    )
  )
);

console.log(reducer(o));

const s = selector([lns.a.view, lns.b.view], (a: number, b: number): number => {
  console.log('not');
  return a + b;
});

console.log(s(o));
console.log(s(o));
console.log(s(o));

const s2 = selector(
  [lns.a.view, lns.b.view, s],
  (a: number, b: number, ss: number): number => {
    console.log('not2');
    return a + b + ss;
  }
);

console.log(s2(o));
console.log(s2(o));
console.log(s2(o));

export const ACTION_ID = 'MOUSE_UP_ON_TAG';

const ar = acitonReducer(ACTION_ID, reducer);

console.log(
  ar.MOUSE_UP_ON_TAG(o.state, { type: ACTION_ID, payload: { z: true } })
);
