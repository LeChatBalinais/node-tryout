import { ValueType } from '../z/target';
import { lens } from '../z/lens';
import { telescope } from '../z/telescope';

interface C {
  c: { [ID in string]: number };
}

interface B {
  b: C[];
}

interface A {
  a: B;
}

describe('Telescope', () => {
  const a = lens<B>()('a', ValueType.Simple, undefined);
  const b = lens<C>()('b', ValueType.Array, undefined);
  const c = lens<number>()('c', ValueType.AssociativeArray, undefined);

  const tlscpABC = telescope(a, b, c);

  const obj = {
    a: {
      b: [{ c: { ras: 1, dva: 2 } }, { c: { ras: 1, dva: 2 } }]
    }
  };

  test('view returns expected value', () => {
    expect(tlscpABC.view(obj)).toEqual([
      { ras: 1, dva: 2 },
      { ras: 1, dva: 2 }
    ]);
  });

  test('viewOver returns expected value', () => {
    const result = [];

    tlscpABC.viewOver(obj, (v: number): void => {
      result.push(v);
    });

    expect(result).toEqual([1, 2, 1, 2]);
  });

  test('set returns expected value', () => {
    expect(
      tlscpABC.set(obj, [
        { ras: 1, dva: 5 },
        { ras: 2, dva: 4 }
      ])
    ).toEqual({
      a: {
        b: [{ c: { ras: 1, dva: 5 } }, { c: { ras: 2, dva: 4 } }]
      }
    });
  });
});

//   test('setOver returns expected value', () => {
//     expect(a.setOver({ a: 3 }, (v: number) => v + 2)).toEqual({ a: 5 });
//   });
