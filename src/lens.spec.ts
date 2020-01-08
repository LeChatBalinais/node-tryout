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

test('Series return expected value', () => {
  expect(getL(ds)).toEqual([1, 3]);
});

// test('Adds 2 + 2 to equal 4', () => {
//   expect(functions.add(2, 2)).not.toBe(5);
// });

// test('Should be null', () => {
//   expect(functions.isNull()).toBeNull();
// });

// test('Should be falsy', () => {
//   expect(functions.checkValue(null)).toBeFalsy();
// });
