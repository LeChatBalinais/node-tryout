import { lens, telescope } from '../optics';
import { ValueType } from '../optics/enums';

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

  const a = lens<B>()('a');
  const b = lens<C>()('b', ValueType.Array);
  const c = lens<number>()('c', ValueType.AssociativeArray);

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

  const a = lens<B>()('a');
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

describe('Subfocused deep telescope', () => {
  interface E {
    e: number;
  }

  interface D {
    d: { [ID in string]: E };
  }

  interface C {
    c: D[];
  }

  interface B {
    b: C[];
  }

  interface A {
    a: { [ID in string]: B };
  }

  function* keyGenC() {
    yield 0;
  }

  function* keyGenD() {
    yield 'Dras';
  }

  const a = lens<B>()('a', ValueType.AssociativeArray);
  const b = lens<C>()('b', ValueType.Array);
  const c = lens<D>()('c', ValueType.Array, keyGenC);
  const d = lens<E>()('d', ValueType.AssociativeArray, keyGenD);
  const e = lens<number>()('e');

  const tlscp = telescope(a, b, c, d, e);

  const obj = {
    a: {
      Aras: {
        b: [{ c: [{ d: { Dras: { e: 1 } } }] }]
      },
      Adva: {
        b: [
          { c: [{ d: { Dras: { e: 2 }, Ddva: { e: 3 } } }] },
          { c: [{ d: { Dras: { e: 4 } } }] }
        ]
      },
      Atri: {
        b: [{ c: [{ d: { Dras: { e: 5 } } }] }]
      }
    }
  };

  test('view returns expected value', () => {
    expect(tlscp.view(obj)).toEqual({
      Aras: [[{ Dras: 1 }]],
      Adva: [[{ Dras: 2 }], [{ Dras: 4 }]],
      Atri: [[{ Dras: 5 }]]
    });
  });

  test('viewOver returns expected value', () => {
    const result = [];

    tlscp.viewOver(obj, (v: number): void => {
      result.push(v);
    });

    expect(result).toEqual([1, 2, 4, 5]);
  });

  test('set returns expected value', () => {
    expect(
      tlscp.set(obj, {
        Aras: [[{ Dras: 0 }]],
        Adva: [[{ Dras: 1 }], [{ Dras: 3 }]],
        Atri: [[{ Dras: 4 }]]
      })
    ).toEqual({
      a: {
        Aras: {
          b: [{ c: [{ d: { Dras: { e: 0 } } }] }]
        },
        Adva: {
          b: [
            { c: [{ d: { Dras: { e: 1 }, Ddva: { e: 3 } } }] },
            { c: [{ d: { Dras: { e: 3 } } }] }
          ]
        },
        Atri: {
          b: [{ c: [{ d: { Dras: { e: 4 } } }] }]
        }
      }
    });
  });

  test('setOver returns expected value', () => {
    expect(tlscp.setOver(obj, v => v + 1)).toEqual({
      a: {
        Aras: {
          b: [{ c: [{ d: { Dras: { e: 2 } } }] }]
        },
        Adva: {
          b: [
            { c: [{ d: { Dras: { e: 3 }, Ddva: { e: 3 } } }] },
            { c: [{ d: { Dras: { e: 5 } } }] }
          ]
        },
        Atri: {
          b: [{ c: [{ d: { Dras: { e: 6 } } }] }]
        }
      }
    });
  });
});

describe('Subfocused deep telescope', () => {
  interface E {
    e: number;
  }

  interface D {
    d: { [ID in string]: E };
  }

  interface C {
    c: D[];
  }

  interface B {
    b: C[];
  }

  interface A {
    a: { [ID in string]: B };
  }

  function* keyGenC({ cp }: { cp: number }) {
    yield cp;
  }

  function* keyGenD({ dp }: { dp: string }) {
    yield dp;
  }

  const a = lens<B>()('a', ValueType.AssociativeArray);
  const b = lens<C>()('b', ValueType.Array);
  const c = lens<D>()('c', ValueType.Array, keyGenC);
  const d = lens<E>()('d', ValueType.AssociativeArray, keyGenD);

  const tlscp = telescope(a, b, c, d);

  const obj = {
    a: {
      Aras: {
        b: [{ c: [{ d: { Dras: { e: 1 } } }] }]
      },
      Adva: {
        b: [
          { c: [{ d: { Dras: { e: 2 }, Ddva: { e: 3 } } }] },
          { c: [{ d: { Dras: { e: 4 } } }] }
        ]
      },
      Atri: {
        b: [{ c: [{ d: { Dras: { e: 5 } } }] }]
      }
    }
  };

  test('view returns expected value', () => {
    expect(tlscp.view(obj, { cp: 0, dp: 'Dras' })).toEqual({
      Aras: [[{ Dras: { e: 1 } }]],
      Adva: [[{ Dras: { e: 2 } }], [{ Dras: { e: 4 } }]],
      Atri: [[{ Dras: { e: 5 } }]]
    });
  });

  test('viewOver returns expected value', () => {
    const result = [];

    tlscp.viewOver(
      obj,
      (v: E): void => {
        result.push(v);
      },
      { cp: 0, dp: 'Dras' }
    );

    expect(result).toEqual([{ e: 1 }, { e: 2 }, { e: 4 }, { e: 5 }]);
  });

  test('set returns expected value', () => {
    expect(
      tlscp.set(
        obj,
        {
          Aras: [[{ Dras: { e: 0 } }]],
          Adva: [[{ Dras: { e: 1 } }], [{ Dras: { e: 3 } }]],
          Atri: [[{ Dras: { e: 4 } }]]
        },
        { cp: 0, dp: 'Dras' }
      )
    ).toEqual({
      a: {
        Aras: {
          b: [{ c: [{ d: { Dras: { e: 0 } } }] }]
        },
        Adva: {
          b: [
            { c: [{ d: { Dras: { e: 1 }, Ddva: { e: 3 } } }] },
            { c: [{ d: { Dras: { e: 3 } } }] }
          ]
        },
        Atri: {
          b: [{ c: [{ d: { Dras: { e: 4 } } }] }]
        }
      }
    });
  });

  test('setOver returns expected value', () => {
    expect(
      tlscp.setOver(
        obj,
        v => ({
          e: v.e + 1
        }),
        { cp: 0, dp: 'Dras' }
      )
    ).toEqual({
      a: {
        Aras: {
          b: [{ c: [{ d: { Dras: { e: 2 } } }] }]
        },
        Adva: {
          b: [
            { c: [{ d: { Dras: { e: 3 }, Ddva: { e: 3 } } }] },
            { c: [{ d: { Dras: { e: 5 } } }] }
          ]
        },
        Atri: {
          b: [{ c: [{ d: { Dras: { e: 6 } } }] }]
        }
      }
    });
  });
});
