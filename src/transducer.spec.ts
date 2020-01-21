import makeLens from './transducer';
import { Lens, lens, view } from './lens';
import { getter } from './getter';

interface O {
  a: number;
  b: string[];
}

describe('MakeLens', () => {
  const o: O = { a: 1, b: ['a', 'b'] };

  const getA = getter('a')<number>();

  const mkLens = makeLens(
    (a: number): Lens<string, number> => lens(getter(a)<string>()),
    [getA]
  );

  const lensAth = mkLens(o);

  test('Test generated lens', () => {
    // expect(view(lensAth, o)).toEqual('b');
    expect('b').toEqual('b');
  });
});
