export type Focus = string | Focus[];

export enum ValueType {
  Simple,
  Array,
  AssociativeArray
}

export type ValueTypeArray = ValueType | ValueTypeArray[];

export type Value<VT extends ValueType, V> = VT extends ValueType.Simple
  ? V
  : VT extends ValueType.Array
  ? V[]
  : { [ID in string]: V };

export type TelescopedValue<V, VT> = VT extends ValueType.Simple
  ? V
  : VT extends ValueType.Array
  ? V[]
  : VT extends ValueType.AssociativeArray
  ? { [ID in string]: V }
  : VT extends ValueTypeArray[]
  ? { [K in keyof VT]: TelescopedValue<V, VT[K]> }
  : never;

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

export type Target<F, VT, V> = VT extends ValueType.Simple
  ? F extends string
    ? {
        [P in F]: V;
      }
    : never
  : VT extends ValueType.Array
  ? F extends string
    ? { [P in F]: V[] }
    : never
  : VT extends ValueType.AssociativeArray
  ? F extends string
    ? { [P in F]: { [ID in string]: V } }
    : never
  : VT extends ValueTypeArray[]
  ? F extends Focus[]
    ? V extends any[]
      ? UnionToIntersection<
          {
            [K in keyof F]: K extends keyof VT & keyof V
              ? F[K] extends Focus
                ? Target<F[K], VT[K], V[K]>
                : F[K]
              : F[K];
          }[number]
        >
      : never
    : never
  : never;

type dss = Target<
  ['a', 'b', ['c', 'd', ['e', 'f']]],
  [
    ValueType.Array,
    ValueType.AssociativeArray,
    [ValueType.Simple, ValueType.Simple, [ValueType.Simple, ValueType.Simple]]
  ],
  [string, number, [string, number, [string, number]]]
>;
