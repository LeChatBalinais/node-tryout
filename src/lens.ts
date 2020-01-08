type Target<
  V,
  PropertyName extends string | number
> = PropertyName extends string
  ? {
      [P in PropertyName]: V;
    }
  : PropertyName extends number
  ? V[]
  : any;

type Setter<V, PropertyName extends string | number> = <
  T extends Target<V, PropertyName>
>(
  t: T,
  v: V
) => T;

export function setter<PropertyName extends string>(
  propName: PropertyName
): <V>() => Setter<V, PropertyName>;

export function setter<PropertyName extends number>(
  propName: PropertyName
): <V>() => Setter<V, PropertyName>;

export function setter(propName: any): <V>() => Setter<V, any> {
  return <V>() => (t: any, v: V): any => {
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

export function getter(propName: any): <V>() => Getter<V, any> {
  return <V, R = any>() => <T>(t: T): V => t[propName];
}

// Series of Getters

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends R1,
  P2 extends string | number,
  R2
>(g1: Getter<V2, P2, R2>, g2: Getter<V1, P1, R1>): (t: R2) => V1;

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
): (t: R3) => V1;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends Target<V1, P1>,
  P2 extends string | number,
  R2,
  V3 extends Target<V2, P2>,
  P3 extends string | number,
  R3,
  V4 extends Target<V3, P3>,
  P4 extends string | number,
  R4
>(
  g1: Getter<V4, P4, R4>,
  g2: Getter<V3, P3, R3>,
  g3: Getter<V2, P2, R2>,
  g4: Getter<V1, P1, R1>
): (t: R4) => V1;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends Target<V1, P1>,
  P2 extends string | number,
  R2,
  V3 extends Target<V2, P2>,
  P3 extends string | number,
  R3,
  V4 extends Target<V3, P3>,
  P4 extends string | number,
  R4,
  V5 extends Target<V4, P4>,
  P5 extends string | number,
  R5
>(
  g1: Getter<V5, P5, R5>,
  g2: Getter<V4, P4, R4>,
  g3: Getter<V3, P3, R3>,
  g4: Getter<V2, P2, R2>,
  g5: Getter<V1, P1, R1>
): (t: R5) => V1;

export function seriesOfGetters<
  V1,
  P1 extends string | number,
  R1,
  V2 extends Target<V1, P1>,
  P2 extends string | number,
  R2,
  V3 extends Target<V2, P2>,
  P3 extends string | number,
  R3,
  V4 extends Target<V3, P3>,
  P4 extends string | number,
  R4,
  V5 extends Target<V4, P4>,
  P5 extends string | number,
  R5,
  V6 extends Target<V5, P5>,
  P6 extends string | number,
  R6
>(
  g1: Getter<V6, P6, R6>,
  g2: Getter<V5, P5, R5>,
  g3: Getter<V4, P4, R4>,
  g4: Getter<V3, P3, R3>,
  g5: Getter<V2, P2, R2>,
  g6: Getter<V1, P1, R1>
): (t: R6) => V1;

export function seriesOfGetters<V1>(...getters: any[]): (t: any) => V1 {
  return (t: any): V1 => {
    return getters.reduce(
      (accumulator, currentValue) => currentValue(accumulator),
      t
    );
  };
}

// Series of Setters

// export function setterSeries<
//   V1,
//   P1 extends string | number,
//   V2 extends Target<V1, P1>,
//   P2 extends string | number
// >(s1: Setter<V2, P2>, s2: Setter<V1, P1>): (t: Target<V2, P2>, v: V2) => Target<V2, P2>;

// export function setterSeries<
//   V1,
//   P1 extends string | number,
//   V2 extends Target<V1, P1>,
//   P2 extends string | number,
//   V3 extends Target<V2, P2>,
//   P3 extends string | number
// >(
//   s1: Setter<V3, P3>,
//   s2: Setter<V2, P2>,
//   s3: Setter<V1, P1>
// ): (t: Target<V3, P3>) => V1;

// export function setterSeries<
//   V1,
//   P1 extends string | number,
//   V2 extends Target<V1, P1>,
//   P2 extends string | number,
//   V3 extends Target<V2, P2>,
//   P3 extends string | number,
//   V4 extends Target<V3, P3>,
//   P4 extends string | number
// >(
//   s1: Setter<V4, P4>,
//   s2: Setter<V3, P3>,
//   s3: Setter<V2, P2>,
//   s4: Setter<V1, P1>
// ): (t: Target<V4, P4>) => V1;

// export function setterSeries<
//   V1,
//   P1 extends string | number,
//   V2 extends Target<V1, P1>,
//   P2 extends string | number,
//   V3 extends Target<V2, P2>,
//   P3 extends string | number,
//   V4 extends Target<V3, P3>,
//   P4 extends string | number,
//   V5 extends Target<V4, P4>,
//   P5 extends string | number
// >(
//   s1: Setter<V5, P5>,
//   s2: Setter<V4, P4>,
//   s3: Setter<V3, P3>,
//   s4: Setter<V2, P2>,
//   s5: Setter<V1, P1>
// ): (t: Target<V5, P5>) => V1;

// export function setterSeries<
//   V1,
//   P1 extends string | number,
//   V2 extends Target<V1, P1>,
//   P2 extends string | number,
//   V3 extends Target<V2, P2>,
//   P3 extends string | number,
//   V4 extends Target<V3, P3>,
//   P4 extends string | number,
//   V5 extends Target<V4, P4>,
//   P5 extends string | number,
//   V6 extends Target<V5, P5>,
//   P6 extends string | number
// >(
//   s1: Setter<V6, P6>,
//   s2: Setter<V5, P5>,
//   s3: Setter<V4, P4>,
//   s4: Setter<V3, P3>,
//   s5: Setter<V2, P2>,
//   s6: Setter<V1, P1>
// ): (t: Target<V6, P6>) => V1;

// export function setterSeries<V1>(...setters: any[], v:any): (t: any) => any {
//   return (t: any): any => {
//     return getters.reduce(
//       (accumulator, currentValue) => currentValue(accumulator),
//       t
//     );
//   };
// }
