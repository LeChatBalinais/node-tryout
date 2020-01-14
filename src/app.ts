import { getter } from './getter';
import { getterArray } from './getter-array';
import { seriesOfGetters } from './getter-series';
import { setter } from './setter';
import { setterSeries } from './setter-series';
import { setterArray } from './setter-array';

interface D {
  n: number[];
}

interface C {
  s: string;
}

interface B {
  [ID: string]: D;
}

interface A {
  c: C;
}

interface O {
  a: A;
  b: B;
}

const getA = getter('a')<A>();
const getB = getter('b')<B>();
const getC = getter('c')<C>();
const getD = getter('d')<D, B>();
const getS = getter('s')<string>();
const getN = getter('n')<number[]>();
const get0 = getter(0)<number>();
const get2 = getter(2)<number>();

const setA = setter('a')<A>();
const setB = setter('b')<B>();
const setC = setter('c')<C>();
const setD = setter('d')<D, B>();
const setS = setter('s')<string>();
const setN = setter('n')<number[]>();
const set0 = setter(0)<number>();
const set2 = setter(2)<number>();

const getSseries = seriesOfGetters(getA, getC, getS);
const get0series = seriesOfGetters(getB, getD, getN, get0);
const get2series = seriesOfGetters(getB, getD, getN, get2);

const setSseries = setterSeries([setA, setC, setS], [getA, getC]);
const set0series = setterSeries([setB, setD, setN, set0], [getB, getD, getN]);
const set2series = setterSeries([setB, setD, setN, set2], [getB, getD, getN]);

const o = { a: { c: { s: '4' } }, b: { d: { n: [3, 2, 5] } } };

const getNS = getterArray(getSseries, get2series, get0series);

const setNS = setterArray(setSseries, set2series);

console.log(getNS(o));

console.log(setNS(o, ['5', 9]).a.c.s);
