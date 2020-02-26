import { lens } from '../y/lens';
import { ValueType } from '../z/target';

describe('Lens on simple value', () => {
  const a = lens<number>()('a');

  test('view returns expected value', () => {
    expect(a.view({ a: 3 })).toBe(3);
  });

  test('set returns expected value', () => {
    expect(a.set({ a: 3 }, 5)).toEqual({ a: 5 });
  });

  test('transient set returns expected value', () => {
    const obj = { a: 3 };

    a.setTransient(obj, 5);

    expect(obj).toEqual({ a: 5 });
  });

  let gv = 0;

  a.viewOver({ a: 3 }, (v: number) => {
    gv = v;
  });

  test('viewOver returns expected value', () => {
    expect(gv).toBe(3);
  });

  test('setOver returns expected value', () => {
    expect(a.setOver({ a: 3 }, (v: number) => v + 2)).toEqual({ a: 5 });
  });

  test('transient setOver returns expected value', () => {
    const obj = { a: 3 };

    a.setOverTransient(obj, (v: number) => v + 2);

    expect(obj).toEqual({ a: 5 });
  });
});

describe('Lens on full array container value', () => {
  const b = lens<number>()('b', ValueType.Array);

  test('view returns expected value', () => {
    expect(b.view({ b: [8, 7] })).toEqual([8, 7]);
  });

  test('set returns expected value', () => {
    expect(b.set({ b: [8, 7] }, [5, 6])).toEqual({ b: [5, 6] });
  });

  test('transient set returns expected value', () => {
    const obj = { b: [8, 7] };

    b.setTransient(obj, [5, 6]);
    expect(obj).toEqual({ b: [5, 6] });
  });

  test('viewOver returns expected value', () => {
    let gv = 0;

    b.viewOver({ b: [8, 7] }, (v: number) => {
      gv += v;
    });
    expect(gv).toBe(15);
  });

  test('setOver returns expected value', () => {
    expect(b.setOver({ b: [8, 7] }, (v: number) => v + 2)).toEqual({
      b: [10, 9]
    });
  });

  test('transient setOver returns expected value', () => {
    const obj = { b: [8, 7] };
    b.setOverTransient(obj, (v: number) => v + 2);
    expect(obj).toEqual({
      b: [10, 9]
    });
  });
});

describe('Lens on part of array container value', () => {
  function* keyGen() {
    yield 1;
    yield 3;
  }

  const d = lens<number>()('d', ValueType.Array, keyGen);

  test('view returns expected value', () => {
    const expectedRes = [];
    expectedRes[1] = 2;
    expectedRes[3] = 4;

    expect(d.view({ d: [1, 2, 3, 4] })).toEqual(expectedRes);
  });

  test('set returns expected value', () => {
    const expectedRes = [];
    expectedRes[1] = 0;
    expectedRes[3] = 0;

    expect(d.set({ d: [1, 2, 3, 4] }, expectedRes)).toEqual({
      d: [1, 0, 3, 0]
    });
  });

  test('transient set returns expected value', () => {
    const expectedRes = [];
    expectedRes[1] = 0;
    expectedRes[3] = 0;

    const obj = { d: [1, 2, 3, 4] };

    d.setTransient(obj, expectedRes);

    expect(obj).toEqual({
      d: [1, 0, 3, 0]
    });
  });

  test('viewOver returns expected value', () => {
    let gv = 0;

    d.viewOver({ d: [1, 2, 3, 4] }, (v: number) => {
      gv += v;
    });
    expect(gv).toBe(6);
  });

  test('setOver returns expected value', () => {
    expect(d.setOver({ d: [1, 2, 3, 4] }, (v: number) => v + 2)).toEqual({
      d: [1, 4, 3, 6]
    });
  });

  test('transient setOver returns expected value', () => {
    const obj = { d: [1, 2, 3, 4] };

    d.setOverTransient(obj, (v: number) => v + 2);

    expect(obj).toEqual({
      d: [1, 4, 3, 6]
    });
  });
});

describe('Lens on full associative array container value', () => {
  const b = lens<number>()('b', ValueType.AssociativeArray);

  test('view returns expected value', () => {
    expect(b.view({ b: { a: 8, b: 7 } })).toEqual({ a: 8, b: 7 });
  });

  test('set returns expected value', () => {
    expect(b.set({ b: { a: 8, b: 7 } }, { a: 3, b: 4, c: 5 })).toEqual({
      b: { a: 3, b: 4, c: 5 }
    });
  });

  test('transient set returns expected value', () => {
    const obj = { b: { a: 8, b: 7 } };

    b.setTransient(obj, { a: 3, b: 4, c: 5 });

    expect(obj).toEqual({
      b: { a: 3, b: 4, c: 5 }
    });
  });

  test('viewOver returns expected value', () => {
    let gv = 0;

    b.viewOver({ b: { a: 8, b: 7 } }, (v: number) => {
      gv += v;
    });
    expect(gv).toBe(15);
  });

  test('setOver returns expected value', () => {
    expect(b.setOver({ b: { a: 8, b: 7 } }, (v: number) => v + 2)).toEqual({
      b: { a: 10, b: 9 }
    });
  });

  test('transient setOver returns expected value', () => {
    const obj = { b: { a: 8, b: 7 } };

    b.setOverTransient(obj, (v: number) => v + 2);

    expect(obj).toEqual({
      b: { a: 10, b: 9 }
    });
  });
});

describe('Lens on part of associative array container value', () => {
  function* keyGen() {
    yield 'a';
  }

  const b = lens<number>()('b', ValueType.AssociativeArray, keyGen);

  test('view returns expected value', () => {
    expect(b.view({ b: { a: 8, b: 7 } })).toEqual({ a: 8 });
  });

  test('set returns expected value', () => {
    expect(b.set({ b: { a: 8, b: 7 } }, { a: 3, c: 5 })).toEqual({
      b: { a: 3, b: 7 }
    });
  });

  test('transient set returns expected value', () => {
    const obj = { b: { a: 8, b: 7 } };

    b.setTransient(obj, { a: 3, c: 5 });

    expect(obj).toEqual({
      b: { a: 3, b: 7 }
    });
  });

  test('viewOver returns expected value', () => {
    let gv = 0;

    b.viewOver({ b: { a: 8, b: 7 } }, (v: number) => {
      gv += v;
    });
    expect(gv).toBe(8);
  });

  test('setOver returns expected value', () => {
    expect(b.setOver({ b: { a: 8, b: 7 } }, (v: number) => v + 2)).toEqual({
      b: { a: 10, b: 7 }
    });
  });

  test('transient setOver returns expected value', () => {
    const obj = { b: { a: 8, b: 7 } };

    b.setOverTransient(obj, (v: number) => v + 2);

    expect(obj).toEqual({
      b: { a: 10, b: 7 }
    });
  });
});

describe('Lens on part of associative array container value with parametered key generation ', () => {
  function* keyGen(param: string) {
    yield param;
  }

  const b = lens<number>()('b', ValueType.AssociativeArray, keyGen);

  test('view returns expected value', () => {
    expect(b.view({ b: { a: 8, b: 7 } }, 'a')).toEqual({ a: 8 });
  });

  test('set returns expected value', () => {
    expect(b.set({ b: { a: 8, b: 7 } }, { a: 3, c: 5 }, 'a')).toEqual({
      b: { a: 3, b: 7 }
    });
  });

  test('transient set returns expected value', () => {
    const obj = { b: { a: 8, b: 7 } };

    b.setTransient(obj, { a: 3, b: 5 }, 'b');

    expect(obj).toEqual({
      b: { a: 8, b: 5 }
    });
  });

  test('viewOver returns expected value', () => {
    let gv = 0;
    b.viewOver(
      { b: { a: 8, b: 7 } },
      (v: number) => {
        gv += v;
      },
      'a'
    );
    expect(gv).toBe(8);
  });

  test('setOver returns expected value', () => {
    expect(b.setOver({ b: { a: 8, b: 7 } }, (v: number) => v + 2, 'a')).toEqual(
      {
        b: { a: 10, b: 7 }
      }
    );
  });

  test('transient setOver returns expected value', () => {
    const obj = { b: { a: 8, b: 7 } };

    b.setOverTransient(obj, (v: number) => v + 2, 'a');

    expect(obj).toEqual({
      b: { a: 10, b: 7 }
    });
  });
});
