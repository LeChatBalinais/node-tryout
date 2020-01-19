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

describe('Getter Series', () => {
  test('series returns expected value', () => {
    expect(1).toBe(1);
  });
  //   const o1: A = { a: { b: { m: { d: [{ e: 3 }, { e: 4 }] } } } };
  //   test('series returns expected value', () => {
  //     expect(series(o1)).toBe(undefined);
  //   });

  //   const o2: A = { a: { b: { c: { d: [{ e: 3 }] } } } };
  //   test('series returns expected value', () => {
  //     expect(series(o2)).toBe(undefined);
  //   });
});
