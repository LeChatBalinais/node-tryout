import { getter } from './getter';

describe('Getter', () => {
  const o = { a: 1, b: '2' };
  const y = { c: 'ds', d: 'ds' };

  const z = ['ds', 'cc'];

  const getA = getter('a')<number>();
  const getB = getter('b')<string>();
  const getC = getter<string>()('c');
  const get1 = getter<string>()(1);

  test('getA returns expected value', () => {
    expect(getA(o)).toEqual(1);
  });

  test('getB returns expected value', () => {
    expect(getB(o)).toEqual('2');
  });

  test('getB returns expected value', () => {
    expect(getB.focus).toEqual('b');
  });

  test('getC returns expected value', () => {
    expect(getC(y)).toEqual('ds');
  });

  test('getC returns expected value', () => {
    expect(get1(z)).toEqual('cc');
  });
});
