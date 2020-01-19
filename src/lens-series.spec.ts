import { getter } from './getter';
import { lens, view, set, over } from './lens';
import { lensSeries } from './lens-series';

interface E {
  e: number;
}

interface D {
  d: E[];
}

interface C {
  [ID: string]: D;
}

interface B {
  b: C;
}

interface A {
  a: B;
}

describe('Getter Series', () => {
  const getA = getter('a')<B>();
  const getB = getter('b')<C>();
  const getC = getter('c')<D, C>();
  const getD = getter('d')<E[]>();
  const getSecond = getter(1)<E>();
  const getE = getter('e')<number>();

  const lensA = lens(getA);
  const lensB = lens(getB);
  const lensC = lens(getC);
  const lensD = lens(getD);
  const lensSecond = lens(getSecond);
  const lensE = lens(getE);

  const seriesAB = lensSeries(lensA, lensB);

  const series = lensSeries(seriesAB, lensC, lensD, lensSecond, lensE);

  const o: A = { a: { b: { c: { d: [{ e: 3 }, { e: 4 }] } } } };

  const o0: A = { a: { b: { c: { d: [{ e: 3 }, { e: 4 }] } } } };

  test('view lens series returns expected value', () => {
    expect(view(series, o)).toEqual(4);
  });

  test('set lens series returns expected value', () => {
    expect(set(series, o, 5)).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 5 }] } } }
    });
  });

  test('over lens series returns expected value', () => {
    expect(over(series, o, (v: number) => v + 1)).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 5 }] } } }
    });
  });

  series(o0, 5, true);

  test('series returns expected value', () => {
    expect(o0).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 5 }] } } }
    });
  });

  const o1: A = { a: { b: { m: { d: [{ e: 3 }, { e: 4 }] } } } };
  test('view lens series returns expected value', () => {
    expect(view(series, o1)).toBe(undefined);
  });

  test('view lens series returns expected value', () => {
    expect(set(series, o1, 5)).toBe(o1);
  });

  const o2: A = { a: { b: { c: { d: [{ e: 3 }] } } } };
  test('view lens series returns expected value', () => {
    expect(set(series, o2, 5)).toBe(o2);
  });
});
