import { lens, array, telescope } from '../optics';
import { ValueType } from '../optics/enums';

describe('Simple Array', () => {
  const a = lens<number>()('a');
  const b = lens<string>()('b');

  const ar = array(a, b);

  test('view returns expected value', () => {
    expect(ar.view({ a: 1, b: 'one' })).toEqual([1, 'one']);
  });

  test('viewOver returns expected value', () => {
    let accum = '';
    ar.viewOver({ a: 1, b: 'one' }, [
      (v: number): void => {
        accum += v.toString();
      },
      (v: string): void => {
        accum += v;
      }
    ]);
    expect(accum).toEqual('1one');
  });

  test('set returns expected value', () => {
    expect(ar.set({ a: 1, b: 'one' }, [2, 'two'])).toEqual({ a: 2, b: 'two' });
  });

  test('setTransient returns expected value', () => {
    const s = { a: 1, b: 'one' };

    ar.setTransient(s, [2, 'two']);

    expect(s).toEqual({ a: 2, b: 'two' });
  });

  test('setOver returns expected value', () => {
    expect(
      ar.setOver({ a: 1, b: 'one' }, [
        (v: number): number => v + 1,
        (v: string): string => v.toUpperCase()
      ])
    ).toEqual({ a: 2, b: 'ONE' });
  });

  test('setOver returns expected value', () => {
    const s = { a: 1, b: 'one' };

    ar.setOverTransient(s, [
      (v: number): number => v + 1,
      (v: string): string => v.toUpperCase()
    ]);

    expect(s).toEqual({ a: 2, b: 'ONE' });
  });
});

describe('Simple Array with Params', () => {
  function* keyGenA({ ap }: { ap: number }) {
    yield ap;
  }

  function* keyGenB({ bp }: { bp: string }) {
    yield bp;
  }

  const a = lens<number>()('a', ValueType.Array, keyGenA);
  const b = lens<string>()('b', ValueType.AssociativeArray, keyGenB);

  const ar = array(a, b);

  test('View returns expected value', () => {
    expect(
      ar.view(
        { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
        { ap: 0, bp: 'one' }
      )
    ).toEqual([[0], { one: 'oneVal' }]);
  });

  test('ViewOver return expected value', () => {
    let accum = '';
    ar.viewOver(
      { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
      [
        (v: number): void => {
          accum += v.toString();
        },
        (v: string): void => {
          accum += v;
        }
      ],
      { ap: 0, bp: 'one' }
    );
    expect(accum).toEqual('0oneVal');
  });

  test('Set return expected value', () => {
    expect(
      ar.set(
        { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
        [[3], { one: 'threeVal' }],
        { ap: 0, bp: 'one' }
      )
    ).toEqual({ a: [3, 1], b: { one: 'threeVal', two: 'twoVal' } });
  });

  test('setTransient return expected value', () => {
    const s = { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } };

    ar.setTransient(s, [[3], { one: 'threeVal' }], { ap: 0, bp: 'one' });

    expect(s).toEqual({ a: [3, 1], b: { one: 'threeVal', two: 'twoVal' } });
  });

  test('setOver return expected value', () => {
    expect(
      ar.setOver(
        { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } },
        [(v: number): number => v + 1, (v: string): string => v.toUpperCase()],
        { ap: 0, bp: 'one' }
      )
    ).toEqual({ a: [1, 1], b: { one: 'ONEVAL', two: 'twoVal' } });
  });

  test('setOverTransient return expected value', () => {
    const s = { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' } };

    ar.setOverTransient(
      s,
      [(v: number): number => v + 1, (v: string): string => v.toUpperCase()],
      { ap: 0, bp: 'one' }
    );

    expect(s).toEqual({ a: [1, 1], b: { one: 'ONEVAL', two: 'twoVal' } });
  });
});

describe('Nested Array with Params', () => {
  function* keyGenA({ ap }: { ap: number }) {
    yield ap;
  }

  function* keyGenB({ bp }: { bp: string }) {
    yield bp;
  }

  const a = lens<number>()('a', ValueType.Array, keyGenA);
  const b = lens<string>()('b', ValueType.AssociativeArray, keyGenB);

  const c = lens<number>()('c');
  const d = lens<string>()('d');

  const ab = array(a, b);

  const cd = array(c, d);

  const abcd = array(ab, cd);

  test('View returns expected value', () => {
    expect(
      abcd.view(
        { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' },
        { ap: 0, bp: 'one' }
      )
    ).toEqual([
      [[0], { one: 'oneVal' }],
      [9, 'deviat']
    ]);
  });

  test('ViewOver return expected value', () => {
    let accum = '';
    abcd.viewOver(
      { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' },
      [
        [
          (v: number): void => {
            accum += v.toString();
          },
          (v: string): void => {
            accum += v;
          }
        ],
        [
          (v: number): void => {
            accum += v.toString();
          },
          (v: string): void => {
            accum += v;
          }
        ]
      ],
      { ap: 0, bp: 'one' }
    );
    expect(accum).toEqual('0oneVal9deviat');
  });

  test('Set return expected value', () => {
    expect(
      abcd.set(
        { a: [0, 1], b: { one: 'oneVal', two: 'twoVal' }, c: 9, d: 'deviat' },
        [
          [[5], { one: 'yes' }],
          [6, 'dsfsd']
        ],
        { ap: 0, bp: 'one' }
      )
    ).toEqual({
      a: [5, 1],
      b: { one: 'yes', two: 'twoVal' },
      c: 6,
      d: 'dsfsd'
    });
  });

  test('setTransient return expected value', () => {
    const s = {
      a: [0, 1],
      b: { one: 'oneVal', two: 'twoVal' },
      c: 9,
      d: 'deviat'
    };

    abcd.setTransient(
      s,
      [
        [[5], { one: 'yes' }],
        [6, 'dsfsd']
      ],
      { ap: 0, bp: 'one' }
    );

    expect(s).toEqual({
      a: [5, 1],
      b: { one: 'yes', two: 'twoVal' },
      c: 6,
      d: 'dsfsd'
    });
  });

  test('setOver return expected value', () => {
    const s = {
      a: [0, 1],
      b: { one: 'oneVal', two: 'twoVal' },
      c: 9,
      d: 'deviat'
    };
    expect(
      abcd.setOver(
        s,
        [
          [
            (v: number): number => v + 1,
            (v: string): string => v.toUpperCase()
          ],
          [(v: number): number => v + 1, (v: string): string => v.toUpperCase()]
        ],
        {
          ap: 0,
          bp: 'one'
        }
      )
    ).toEqual({
      a: [1, 1],
      b: { one: 'ONEVAL', two: 'twoVal' },
      c: 10,
      d: 'DEVIAT'
    });
  });

  test('setOverTransient return expected value', () => {
    const s = {
      a: [0, 1],
      b: { one: 'oneVal', two: 'twoVal' },
      c: 9,
      d: 'deviat'
    };

    abcd.setOverTransient(
      s,
      [
        [(v: number): number => v + 10, (v: string): string => v.toLowerCase()],
        [(v: number): number => v + 10, (v: string): string => v.toLowerCase()]
      ],
      {
        ap: 0,
        bp: 'one'
      }
    );
    expect(s).toEqual({
      a: [10, 1],
      b: { one: 'oneval', two: 'twoVal' },
      c: 19,
      d: 'deviat'
    });
  });
});

describe('Telescoped Array with Params', () => {
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
  // const w = lens<string>()('w');

  const ab = array(a, b);

  const t = telescope(ab, v);

  test('View returns expected value', () => {
    expect(
      t.view(
        { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
        { ap: 0, bp: 'one' }
      )
    ).toEqual([[3], { one: 4 }]);
  });

  test('ViewOver returns expected value', () => {
    let sum = 0;

    t.viewOver(
      { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
      (hr: number): void => {
        sum += hr;
      },
      {
        ap: 0,
        bp: 'one'
      }
    );
    expect(sum).toEqual(7);
  });

  test('Set returns expected value', () => {
    expect(
      t.set(
        { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
        [[4], { one: 5 }],
        {
          ap: 0,
          bp: 'one'
        }
      )
    ).toEqual({ a: [{ v: 4 }], b: { one: { v: 5, w: '4' } } });
  });

  test('SetOver returns expected value', () => {
    expect(
      t.setOver(
        { a: [{ v: 3 }], b: { one: { v: 4, w: '4' } } },
        (vv: number): number => vv + 4,
        {
          ap: 0,
          bp: 'one'
        }
      )
    ).toEqual({ a: [{ v: 7 }], b: { one: { v: 8, w: '4' } } });
  });
});
