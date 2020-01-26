import { getter } from './getter-x';
import { getterSeries } from './getter-series-x';

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
  const getC = getter<D>()('c');
  const getD = getter('d')<E[]>();
  const getSecond = getter<E>()(1);
  const getE = getter('e')<number>();

  const seriesAB = getterSeries(getA, getB);

  const series = getterSeries(seriesAB, getC, getD, getSecond, getE);

  const o: A = { a: { b: { c: { d: [{ e: 3 }, { e: 4 }] } } } };

  test('series returns expected value', () => {
    expect(series(o)).toBe(4);
  });
  const o1: A = { a: { b: { m: { d: [{ e: 3 }, { e: 4 }] } } } };
  test('series returns expected value', () => {
    expect(series(o1)).toBe(undefined);
  });

  const o2: A = { a: { b: { c: { d: [{ e: 3 }] } } } };
  test('series returns expected value', () => {
    expect(series(o2)).toBe(undefined);
  });
});
