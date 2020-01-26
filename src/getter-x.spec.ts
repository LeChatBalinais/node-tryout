import { getter } from './getter-x';

describe('Getter', () => {
  const o = { a: 1, b: '2' };
  const y = { c: 'ds', d: 'ds' };

  const z = ['ds', 'cc'];

  const getA = getter('a')<number>();
  const getB = getter('b')<string>();
  const getC = getter<string>()('c');
  const getNth = getter<string>();
  const get1 = getNth(1);
  const get0 = getNth(0);

  test('getA returns expected value', () => {
    expect(getA(o)).toEqual(1);
  });

  test('getB returns expected value', () => {
    expect(getB(o)).toEqual('2');
  });

  test('getC returns expected value', () => {
    expect(getC(y)).toEqual(['ds']);
  });

  test('get0 returns expected value', () => {
    expect(get0(z)).toEqual(['ds']);
  });

  test('get1 returns expected value', () => {
    expect(get1(z)).toEqual(['cc']);
  });
});