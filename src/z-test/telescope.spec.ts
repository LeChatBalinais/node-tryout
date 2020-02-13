import { ValueType } from '../z/target';
import { lens } from '../z/lens';
import { telescope } from '../z/telescope';

describe('Telescope', () => {
  interface C {
    c: { [ID in string]: number };
  }

  interface B {
    b: C[];
  }

  interface A {
    a: B;
  }

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

  test('setOver returns expected value', () => {
    expect(tlscpABC.setOver(obj, v => v + 1)).toEqual({
      a: {
        b: [{ c: { ras: 2, dva: 3 } }, { c: { ras: 2, dva: 3 } }]
      }
    });
  });
});

describe('Subfocused telescope', () => {
  interface C {
    c: { [ID in string]: number };
  }

  interface B {
    b: C[];
  }

  interface A {
    a: B;
  }

  function* keyGenB() {
    yield 1;
  }

  function* keyGenC() {
    yield 'dva';
  }

  const a = lens<B>()('a', ValueType.Simple, undefined);
  const b = lens<C>()('b', ValueType.Array, keyGenB);
  const c = lens<number>()('c', ValueType.AssociativeArray, keyGenC);

  const tlscpABC = telescope(a, b, c);

  const obj = {
    a: {
      b: [{ c: { ras: 1, dva: 2 } }, { c: { ras: 2, dva: 4 } }]
    }
  };

  test('view returns expected value', () => {
    expect(tlscpABC.view(obj)).toEqual([, { dva: 4 }]);
  });

  test('viewOver returns expected value', () => {
    const result = [];

    tlscpABC.viewOver(obj, (v: number): void => {
      result.push(v);
    });

    expect(result).toEqual([4]);
  });

  test('set returns expected value', () => {
    expect(tlscpABC.set(obj, [, { dva: 8 }])).toEqual({
      a: {
        b: [{ c: { ras: 1, dva: 2 } }, { c: { ras: 2, dva: 8 } }]
      }
    });
  });

  test('setOver returns expected value', () => {
    expect(tlscpABC.setOver(obj, v => v + 1)).toEqual({
      a: {
        b: [{ c: { ras: 1, dva: 2 } }, { c: { ras: 2, dva: 5 } }]
      }
    });
  });
});

// describe('Subfocused telescope', () => {
//   interface E {
//     e: number;
//   }

//   interface D {
//     d: { [ID in string]: E };
//   }

//   interface C {
//     c: D[];
//   }

//   interface B {
//     b: C[];
//   }

//   interface A {
//     a: { [ID in string]: B };
//   }

//   function* keyGenC() {
//     yield 0;
//   }

//   function* keyGenD() {
//     yield 'dva';
//   }

//   const a = lens<B>()('a', ValueType.AssociativeArray, undefined);
//   const b = lens<C>()('b', ValueType.Array, undefined);
//   const c = lens<D>()('c', ValueType.Array, keyGenC);
//   const d = lens<E>()('d', ValueType.AssociativeArray, keyGenD);
//   const e = lens<number>()('e', ValueType.Simple, undefined);

//   const tlscp = telescope(a, b, c, d, e);

//   const obj = {
//     a: {
//       Aras: {
//         b: [{ c: [{ d: { Dras: { e: 1 } } }] }]
//       },
//       Adva: {
//         b: [
//           { c: [{ d: { Dras: { e: 1 }, Ddva: { 1: 1 } } }] },
//           { c: [{ d: { Dras: { e: 1 } } }] }
//         ]
//       },
//       Atri: {
//         b: [{ c: [{ d: { Dras: { e: 1 } } }] }]
//       }
//     }
//   };

//   test('view returns expected value', () => {
//     expect(tlscp.view(obj)).toEqual([, { dva: 4 }]);
//   });

//   // test('viewOver returns expected value', () => {
//   //   const result = [];

//   //   tlscpABC.viewOver(obj, (v: number): void => {
//   //     result.push(v);
//   //   });

//   //   expect(result).toEqual([4]);
//   // });

//   // test('set returns expected value', () => {
//   //   expect(tlscpABC.set(obj, [, { dva: 8 }])).toEqual({
//   //     a: {
//   //       b: [{ c: { ras: 1, dva: 2 } }, { c: { ras: 2, dva: 8 } }]
//   //     }
//   //   });
//   // });

//   // test('setOver returns expected value', () => {
//   //   expect(tlscpABC.setOver(obj, v => v + 1)).toEqual({
//   //     a: {
//   //       b: [{ c: { ras: 1, dva: 2 } }, { c: { ras: 2, dva: 5 } }]
//   //     }
//   //   });
//   // });
// });
