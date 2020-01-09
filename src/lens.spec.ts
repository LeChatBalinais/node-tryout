import { seriesOfGetters, getter, setter } from './lens';

const ds = { x: { y: { z: { k: [{ l: [1, 3] }] } } } };

const getOne = getter('x')<{ y: { z: { k: { l: number[] }[] } } }>();
const getTwo = getter('y')<{ z: { k: { l: number[] }[] } }>();
const getThree = getter('z')<{ k: { l: number[] }[] }>();
const getFour = getter('k')<{ l: number[] }[]>();
const getFive = getter(0)<{ l: number[] }>();
const getSix = getter('l')<number[]>();

const getL = seriesOfGetters(
  getOne,
  getTwo,
  getThree,
  getFour,
  getFive,
  getSix
);

test('Series of getters (array and object) return expected value', () => {
  expect(getL(ds)).toEqual([1, 3]);
});

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

test('Series of getters (object and object with dynamic props) return expected value', () => {
  expect(getMKN(k)).toBe(3);
});
