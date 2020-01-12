import {
  seriesOfGetters,
  setterSeries,
  getter,
  setter,
  lens,
  view,
  set,
  over
} from './lens';

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

const a: A = { a: { b: { c: { d: [{ e: 3 }, { e: 4 }] } } } };

const getA = getter('a')<B>();
const getB = getter('b')<C>();
const getC = getter('c')<D, C>();
const getD = getter('d')<E[]>();
const getSecond = getter(1)<E>();
const getE = getter('e')<number>();

const getEOfSecondOfDOfCofBofA = seriesOfGetters(
  getA,
  getB,
  getC,
  getD,
  getSecond,
  getE
);

test('Series of getters (array, object and object with dynamic props) returns expected value', () => {
  expect(getEOfSecondOfDOfCofBofA(a)).toBe(a.a.b.c.d[1].e);
});

const setA = setter('a')<B>();
const setB = setter('b')<C>();
const setC = setter('c')<D, C>();
const setD = setter('d')<E[]>();
const setSecond = setter(1)<E>();
const setE = setter('e')<number>();

const setEOfSecondOfDOfCofBofA = setterSeries(
  [setA, setB, setC, setD, setSecond, setE],
  [getA, getB, getC, getD, getSecond]
);

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

describe('Transient lenses', () => {
  test('Lens assoc (array, object and object with dynamic props) returns expected value', () => {
    lensA(a, 7, true);
    expect(a).toEqual({
      a: { b: { c: { d: [{ e: 3 }, { e: 7 }] } } }
    });
  });
});
