import { getter } from './getter';

describe('Getter', () => {
  const o = { a: 1, b: '2' };

  const getA = getter('a')<number>();
  const getB = getter('b')<string>();
  const getC = getter('c')<string, { [ID: string]: string }>();
  const get1 = getter(1)<string>();

  test('getA returns expected value', () => {
    expect(getA(o)).toEqual(1);
  });

  test('getB returns expected value', () => {
    expect(getB(o)).toEqual('2');
  });

  test('getB returns expected value', () => {
    expect(getB.focus).toEqual('b');
  });
});
