import { array } from '../y/array';
import { lens } from '../y/lens';
import { ValueType } from '../z/target';
import { telescope } from '../y/telescope';

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
      (v: number) => {
        accum += v.toString();
      },
      (v: string) => {
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
        (v: number) => v + 1,
        (v: string) => v.toUpperCase()
      ])
    ).toEqual({ a: 2, b: 'ONE' });
  });

  test('setOver returns expected value', () => {
    const s = { a: 1, b: 'one' };

    ar.setOverTransient(s, [
      (v: number) => v + 1,
      (v: string) => v.toUpperCase()
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
        (v: number) => {
          accum += v.toString();
        },
        (v: string) => {
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
          [(v: number) => v + 1, (v: string) => v.toUpperCase()],
          [(v: number) => v + 1, (v: string) => v.toUpperCase()]
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
        [(v: number) => v + 10, (v: string) => v.toLowerCase()],
        [(v: number) => v + 10, (v: string) => v.toLowerCase()]
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
