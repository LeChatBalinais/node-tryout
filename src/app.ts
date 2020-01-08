import { seriesOfGetters, getter, setter } from './lens';

const ds = { x: { y: { z: { k: [{ l: [1, 3] }] } } } };

// const setEEE = setter('i')<number, { i: number; j: number }>();

// const getEl = getter(3)<number>();

// console.log(setEEE({ i: 3, j: 3 }, 2));

// console.log(setOne({ i: 3 }, 6));

const sd = { x: 3, y: 2 };
const dsa = [3, 4, 5];

const setOne = setter('x')<number>();
const setTwo = setter(0)<number>();

console.log(setOne(sd, 4));
console.log(setTwo(dsa, 10));

const getOne = getter('x')<{ y: { z: { k: { l: number[] }[] } } }>();
const getTwo = getter('y')<{ z: { k: { l: number[] }[] } }>();
const getThree = getter('z')<{ k: { l: number[] }[] }>();
const getFour = getter('k')<{ l: number[] }[]>();
const getFive = getter(0)<{ l: number[] }>();
const getSix = getter('l')<number[]>();

const getZofYofX = seriesOfGetters(
  getOne,
  getTwo,
  getThree,
  getFour,
  getFive,
  getSix
);

console.log(getZofYofX(ds));

const getZO = getter('i')<number>();
const getZN = getter(1)<number>();

getZO({ i: 3, k: 3 });
getZN([1, 32, 43]);

const k: {
  m: {
    [ID: string]: number;
  };
} = { m: { ds: 3 } };

const getM = getter('m')<{
  [ID: string]: number;
}>();

const getKN = getter('ds')<
  number,
  {
    [ID: string]: number;
  }
>();

const getMKN = seriesOfGetters(getM, getKN);

getMKN(k);
