import { lens, view, set } from './lens';
import { getter } from './getter';

describe('Lens', () => {
  const o = { a: 1, b: '2' };

  const z = { a: 'a', b: 'b' };

  const y = [1, 2];

  const getA = getter('a')<number>();
  const getB = getter('b')<string>();

  const getSome = getter<string>();
  const getNth = getter<number>();

  const lensSome = lens(getSome);
  const lensNth = lens(getNth);

  const lensSomeA = lensSome('a');
  const lensSomeB = lensSome('b');

  const lens1 = lensNth(1);

  const lensA = lens(getA);
  const lensB = lens(getB);

  test('View lensA returns expected value', () => {
    expect(view(lensA, o)).toEqual(1);
  });

  test('View lensB returns expected value', () => {
    expect(view(lensB, o)).toEqual('2');
  });

  test('Set lensB returns expected value', () => {
    expect(set(lensB, o, '4')).toEqual({ a: 1, b: '4' });
  });

  test('Get lensSomeB returns expected value', () => {
    expect(view(lensSomeB, z)).toEqual('b');
  });

  test('Get lensNth returns expected value', () => {
    expect(view(lens1, y)).toEqual(2);
  });
});
