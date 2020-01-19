import { lens, view, set } from './lens';
import { getter } from './getter';
import { lensArray } from './lens-array';

interface F {
  g: number;
  h: string;
}

interface E {
  f: F;
}

interface B {
  e: E[];
}

interface A {
  [ID: string]: number;
}

interface O {
  a: B;
  b: A;
}

interface Z {
  y: number;
  x: string;
}

describe('Lens Array', () => {
  const z = { y: 1, x: '1' };

  const getY = getter('y')<number>();
  const getX = getter('x')<string>();

  const lensY = lens(getY);
  const lensX = lens(getX);

  const lensYX = lensArray(lensY, lensX);

  test('Lens array returns expected value', () => {
    expect(view(lensYX, z)).toEqual([1, '1']);
  });

  test('Lens array returns expected value', () => {
    expect(set(lensYX, z, [2, '2'])).toEqual({ y: 2, x: '2' });
  });

  const z1 = { y: 1, x: '1' };

  lensYX(z1, [2, '2'], true);

  test('Lens array returns expected value', () => {
    expect(z1).toEqual({ y: 2, x: '2' });
  });
});
