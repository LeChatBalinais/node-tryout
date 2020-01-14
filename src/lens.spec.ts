import { lens, view, set, over, Lens } from './lens';
import { getter, Getter } from './getter';
import { setter, Setter } from './setter';
import { seriesOfGetters } from './getter-series';
import { setterSeries } from './setter-series';
import { getterArray } from './getter-array';

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

function prepareContext(): [
  A,
  Getter<
    number,
    'a',
    {
      a: B;
    }
  >,
  Setter<number, 'a', { a: B }>,
  Lens<
    number,
    'a',
    {
      a: B;
    }
  >
] {
  const getA = getter('a')<B>();
  const getB = getter('b')<C>();
  const getC = getter('c')<D, C>();
  const getD = getter('d')<E[]>();
  const getSecond = getter(1)<E>();
  const getE = getter('e')<number>();

  const setA = setter('a')<B>();
  const setB = setter('b')<C>();
  const setC = setter('c')<D, C>();
  const setD = setter('d')<E[]>();
  const setSecond = setter(1)<E>();
  const setE = setter('e')<number>();

  const getEOfSecondOfDOfCofBofA = seriesOfGetters(
    getA,
    getB,
    getC,
    getD,
    getSecond,
    getE
  );
  const setEOfSecondOfDOfCofBofA = setterSeries(
    [setA, setB, setC, setD, setSecond, setE],
    [getA, getB, getC, getD, getSecond]
  );

  return [
    { a: { b: { c: { d: [{ e: 3 }, { e: 4 }] } } } },
    getEOfSecondOfDOfCofBofA,
    setEOfSecondOfDOfCofBofA,
    lens(getEOfSecondOfDOfCofBofA, setEOfSecondOfDOfCofBofA)
  ];
}

describe('Persistent lenses', () => {
  const [
    a,
    getEOfSecondOfDOfCofBofA,
    setEOfSecondOfDOfCofBofA
  ] = prepareContext();

  test('Series of getters (array, object and object with dynamic props) returns expected value', () => {
    expect(getEOfSecondOfDOfCofBofA(a)).toBe(a.a.b.c.d[1].e);
  });

  test('Series of setters (array, object and object with dynamic props) returns expected value', () => {
    expect(setEOfSecondOfDOfCofBofA(a, 7)).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 7 }] } } }
    });
  });

  const lensA = lens(getEOfSecondOfDOfCofBofA, setEOfSecondOfDOfCofBofA);

  test('Lens prop (array, object and object with dynamic props) returns expected value', () => {
    expect(lensA(a)).toBe(a.a.b.c.d[1].e);
  });

  test('Lens assoc (array, object and object with dynamic props) returns expected value', () => {
    expect(lensA(a, 7)).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 7 }] } } }
    });
  });

  test('View (array, object and object with dynamic props) returns expected value', () => {
    expect(view(lensA, a)).toBe(a.a.b.c.d[1].e);
  });

  test('Set (array, object and object with dynamic props) returns expected value', () => {
    expect(set(lensA, a, 7)).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 7 }] } } }
    });
  });

  test('Over (array, object and object with dynamic props) returns expected value', () => {
    expect(
      over(lensA, a, (v: number): number => {
        return v + 1;
      })
    ).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 5 }] } } }
    });
  });
});

describe('Transient lenses', () => {
  const [
    a,
    getEOfSecondOfDOfCofBofA,
    setEOfSecondOfDOfCofBofA,
    lensA
  ] = prepareContext();

  test('Lens assoc (array, object and object with dynamic props) returns expected value', () => {
    lensA(a, 7, true);
    expect(a).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 7 }] } } }
    });
  });
});

describe('Getter array', () => {
  const o = { a: 1, b: 2 };

  const getA = getter('a')<number>();
  const getB = getter('b')<string>();

  const getAB = getterArray(getA, getB);

  getAB(o);

  test('Lens assoc (array, object and object with dynamic props) returns expected value', () => {
    expect(getAB(o)).toEqual([1, '2']);
  });
});
