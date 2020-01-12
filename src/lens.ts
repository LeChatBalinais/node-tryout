type Target<
  V,
  PropertyName extends string | number
> = PropertyName extends string
  ? {
      [P in PropertyName]: V;
    }
  : PropertyName extends number
  ? V[]
  : null;

type Setter<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
> = <T extends R>(t: T, v: V) => T;

export function setter<PropertyName extends string>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Setter<V, PropertyName, R>;

export function setter<PropertyName extends number>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Setter<V, PropertyName, R>;

export function setter(propName) {
  return () => (t, v) => {
    if (Array.isArray(t))
      return [...t.slice(0, propName), v, ...t.slice(propName + 1)];

    return {
      ...t,
      [propName]: v
    };
  };
}

// Getter

type Getter<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
> = <T extends R>(t: T) => V;

export function getter<PropertyName extends number>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter<PropertyName extends string>(
  propName: PropertyName
): <V, R = Target<V, PropertyName>>() => Getter<V, PropertyName, R>;

export function getter(propName) {
  return () => t => t[propName];
}

// Series of Getters

function seriesOfGettersImpl(...getters) {
  return t => {
    return getters.reduce(
      (accumulator, currentValue) => currentValue(accumulator),
      t
    );
  };
}

function createSerieses(previousValue, currentValue, currentIndex, array) {
  if (currentIndex === 0) return [...previousValue, currentValue];
  return [
    ...previousValue,
    seriesOfGettersImpl(...array.slice(0, currentIndex + 1))
  ];
}

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(g1: Getter<V2, P2, R2>, g2: Getter<V1, P1, R1>): Getter<V1, P2, R2>;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3
>(
  g1: Getter<V3, P3, R3>,
  g2: Getter<V2, P2, R2>,
  g3: Getter<V1, P1, R1>
): Getter<V1, P3, R3>;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4
>(
  g1: Getter<V4, P4, R4>,
  g2: Getter<V3, P3, R3>,
  g3: Getter<V2, P2, R2>,
  g4: Getter<V1, P1, R1>
): Getter<V1, P4, R4>;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5
>(
  g1: Getter<V5, P5, R5>,
  g2: Getter<V4, P4, R4>,
  g3: Getter<V3, P3, R3>,
  g4: Getter<V2, P2, R2>,
  g5: Getter<V1, P1, R1>
): Getter<V1, P5, R5>;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5,
  V6 extends R5,
  P6 extends string | number,
  R6
>(
  g1: Getter<V6, P6, R6>,
  g2: Getter<V5, P5, R5>,
  g3: Getter<V4, P4, R4>,
  g4: Getter<V3, P3, R3>,
  g5: Getter<V2, P2, R2>,
  g6: Getter<V1, P1, R1>
): Getter<V1, P6, R6>;

export function seriesOfGetters(...getters) {
  return seriesOfGettersImpl(...getters);
}

// Series of Setters

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(
  setters: [Setter<V2, P2, R2>, Setter<V1, P1, R1>],
  getters: [Getter<V2, P2, R2>]
): Setter<V1, P2, R2>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3
>(
  setters: [Setter<V3, P3, R3>, Setter<V2, P2, R2>, Setter<V1, P1, R1>],
  getters: [Getter<V3, P3, R3>, Getter<V2, P2, R2>]
): Setter<V1, P3, R3>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4
>(
  setters: [
    Setter<V4, P4, R4>,
    Setter<V3, P3, R3>,
    Setter<V2, P2, R2>,
    Setter<V1, P1, R1>
  ],
  getters: [Getter<V4, P4, R4>, Getter<V3, P3, R3>, Getter<V2, P2, R2>]
): Setter<V1, P4, R4>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5
>(
  setters: [
    Setter<V5, P5, R5>,
    Setter<V4, P4, R4>,
    Setter<V3, P3, R3>,
    Setter<V2, P2, R2>,
    Setter<V1, P1, R1>
  ],
  getters: [
    Getter<V5, P5, R5>,
    Getter<V4, P4, R4>,
    Getter<V3, P3, R3>,
    Getter<V2, P2, R2>
  ]
): Setter<V1, P5, R5>;

export function setterSeries<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2,
  V3 extends R2,
  P3 extends string | number,
  R3,
  V4 extends R3,
  P4 extends string | number,
  R4,
  V5 extends R4,
  P5 extends string | number,
  R5,
  V6 extends R5,
  P6 extends string | number,
  R6
>(
  setters: [
    Setter<V6, P6, R6>,
    Setter<V5, P5, R5>,
    Setter<V4, P4, R4>,
    Setter<V3, P3, R3>,
    Setter<V2, P2, R2>,
    Setter<V1, P1, R1>
  ],
  getters: [
    Getter<V6, P6, R6>,
    Getter<V5, P5, R5>,
    Getter<V4, P4, R4>,
    Getter<V3, P3, R3>,
    Getter<V2, P2, R2>
  ]
): Setter<V1, P6, R6>;

export function setterSeries(setters, getters) {
  const gettersSeries = getters.reduce(createSerieses, []);

  return (t, v) => {
    let i = gettersSeries.length - 1;
    return setters.reduceRight((accumulator, currentValue) => {
      if (i >= 0) {
        const result = currentValue(gettersSeries[i](t), accumulator);
        i -= 1;
        return result;
      }
      return currentValue(t, accumulator);
    }, v);
  };
}

type Lens<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
> = Getter<V, PropertyName, R> & Setter<V, PropertyName, R>;

export function lens<
  V,
  PropertyName extends string | number,
  R = Target<V, PropertyName>
>(
  g: Getter<V, PropertyName, R>,
  s: Setter<V, PropertyName, R>
): Lens<V, PropertyName, R>;

export function lens(g, s) {
  return (...args) => {
    if (args.length === 1) return g(args[0]);

    return s(args[0], args[1]);
  };
}

export function view<V, PropertyName extends string | number, R>(
  l: Lens<V, PropertyName, R>,
  t: R
): V {
  return l(t);
}

export function set<V, PropertyName extends string | number, R>(
  l: Lens<V, PropertyName, R>,
  t: R,
  v: V
): R {
  return l(t, v);
}

export function over<V, PropertyName extends string | number, R>(
  l: Lens<V, PropertyName, R>,
  t: R,
  fn: (v: V) => V
): R {
  return set(l, t, fn(view(l, t)));
}
