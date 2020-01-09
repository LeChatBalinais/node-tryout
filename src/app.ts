import { setter, getter, setterSeries, lens } from './lens';

const ds = { x: { y: { z: { k: [{ l: [1, 3] }] } } } };

// const setEEE = setter('i')<number, { i: number; j: number }>();

// const getEl = getter(3)<number>();

// console.log(setEEE({ i: 3, j: 3 }, 2));

// console.log(setOne({ i: 3 }, 6));

const sd = { x: 3, y: 2 };
const dsa = [3, 4, 5];

const setOne = setter('x')<number>();
const setTwo = setter(0)<number>();

const getOne = getter('x')<number>();
const getTwo = getter(0)<number>();

const lensOne = lens(getOne, setOne);
const lensTwo = lens(getTwo, setTwo);

console.log(lensOne(sd));
console.log(lensOne(sd, 6));

console.log(lensTwo(dsa));
console.log(lensTwo(dsa, 9));

console.log(setOne(sd, 4));
console.log(setTwo(dsa, 10));

const k: {
  m: {
    [ID: string]: number;
  };
} = { m: { ds: 3 } };

const setDs = setter('ds')<
  number,
  {
    [ID: string]: number;
  }
>();

const getDs = getter('ds')<
  number,
  {
    [ID: string]: number;
  }
>();

const lensDs = lens(getDs, setDs);

console.log(lensDs(k.m));

console.log(lensDs(k.m, 9));

const getM = getter('m')<{
  [ID: string]: number;
}>();

const setM = setter('m')<{
  [ID: string]: number;
}>();

const lensM = lens(getM, setM);

console.log(lensM(k));
console.log(lensM(k, { bs: 0 }));

// const setXX = setterSeries([setM, setDs], [getM]);

// setXX(k, 9);
